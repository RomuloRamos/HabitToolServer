import {FastifyInstance} from 'fastify';
import { z } from 'zod'
import { prisma } from "./lib/prisma";



export async function appRoutes(app: FastifyInstance)
{

    app.post('/habits', async(request)=>{

        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6)),
        });

        const {title, weekDays} = createHabitBody.parse(request.body);

        const today = new Date();

        await prisma.habit.create({
            data: {
                title,
                create_at: today,
                weekDays: {
                    create: weekDays.map(weekDay =>{
                        return {
                            week_day:weekDay,
                        }
                    })
                }
            }
        });
    })

    app.get('/day', async (request) => {
        
        const getDayParams = z.object({
            date: z.coerce.date()
        });
        
        const {date} = getDayParams.parse(request.query);
        const parsedDate =  new Date(date);
        parsedDate.setUTCHours(0,0,0,0);
        console.log("date: ",date);
        const weekDay = date.getUTCDay();
        console.log("weekDay", weekDay);
        //Todos os habitos possíveis
        //Habitos que foram completados
        const possibleHabits = await prisma.habit.findMany({
            where:{
                create_at: {
                    lte: parsedDate,
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        });

        const day = await prisma.day.findUnique({
            where: {
                date: date
            },
            include:{
                dayHabits:true
            }
        })

        const completedHabits = day?.dayHabits.map(dayHabit =>{
            return dayHabit.habit_id
        })

        return {
            possibleHabits, 
            completedHabits
        }
    })
    
    app.patch('/habits/:id/toggle', async (request)=>{

        const toggleHabitParams = z.object({
            id: z.string().uuid(),
        });
        
        const {id} = toggleHabitParams.parse(request.params);

        const today =  new Date();
        today.setUTCHours(0,0,0,0);

        let day = await prisma.day.findUnique({
            where: {
                date: today
            }
        });

        if(!day){
            day = await prisma.day.create({
                data:{
                    date: today
                }
            })
        }

        //Check if the habit is already checked for the day
        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    //due to the way it was defined, it is only possible to have ONE record of a specific habit for ONE specific day. So it's unique to query.
                    day_id: day.id,
                    habit_id: id
                }
            }
        })
        
        if(dayHabit)//If the record exist, so the habit is already checked and should be unchecked 
        {   
            await prisma.dayHabit.delete({
                where:{
                    id: dayHabit.id
                }
            });
        }else //If the habit is unchecked in the day, create a record to be checked now.
            await prisma.dayHabit.create({
                data:{
                    //Check one especific habit in an especific day
                    day_id: day.id,
                    habit_id: id
                }
            });
    })

    app.get('/summary', async()=>{
        // [{date: 17/01, amount:5, completed: 1}, {date: 18/01, amount:3, completed: 3}, {}, {},]
        //As this is a complex query, is better do this with a Raw query
        const summary = await prisma.$queryRaw`
        SELECT D.id, D.date, 
        (
            SELECT cast(count(*) as float) 
            FROM day_habits DH
            WHERE DH.day_id = D.id
        ) as completed,
        (
            SELECT cast(count(*) as float) 
            FROM habit_week_days HWD
            JOIN habits H
                ON H.id = HWD.habit_id
            WHERE 
                HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                AND H.create_at <= D.date
        )as amount
        FROM days D
        `

        return summary;
    });
}