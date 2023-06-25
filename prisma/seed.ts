import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const firstHabitId = '234fea4c-dc12-3234-4433-aabbccddeeff'
const firstHabitCreationDate = new Date('2022-03-31T00:00:00.000')

const secondHabitId = '2341aaaa-dc12-3234-4433-001122334455'
const secondHabitCreationDate = new Date('2023-01-03T00:00:00.000')

const thirdHabitId = 'fadc3333-dc12-3234-4433-edfa3c586df2'
const thirdHabitCreationDate = new Date('2023-01-08T00:00:00.000')

async function run() {
    // Clear the database
    await prisma.habitWeekDays.deleteMany();
    await prisma.dayHabit.deleteMany();
    await prisma.day.deleteMany();
    await prisma.habit.deleteMany();
    // Creat habits
    await Promise.all([
        prisma.habit.create({
            data: {
                id: firstHabitId,
                title: 'Beber água',
                create_at: firstHabitCreationDate,
                weekDays: {
                    create: [
                        // {week_day: 0},
                        {week_day: 1},
                        {week_day: 2},
                        {week_day: 3},
                        {week_day: 4},
                        {week_day: 5},
                        // {week_day: 6},
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: secondHabitId,
                title: 'Exercitar',
                create_at: secondHabitCreationDate,
                weekDays: {
                    create: [
                        {week_day: 4},
                        {week_day: 5},
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: thirdHabitId,
                title: 'Dormir 8 Horas',
                create_at: thirdHabitCreationDate,
                weekDays: {
                    create: [
                        {week_day: 1},
                        {week_day: 2},
                        {week_day: 3},
                        {week_day: 4},
                        {week_day: 5},
                    ]
                }
            }
        }),
    ]);

    await Promise.all([
        
        prisma.day.create({
            data: {
                // Monday
                date: new Date('2023-01-02T00:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    }
                }
            }
        }),

        prisma.day.create({
            data: {
                // Friday
                date: new Date('2023-01-06T00:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    }
                }
            }
        }),

        prisma.day.create({
            data: {
                // Wednesday
                date: new Date('2023-01-04T00:00:00.000z'),
                dayHabits: {
                    create: [
                        {habit_id: firstHabitId},
                    ]
                }
            }
        }),

    ]);
}

run()
.then(async ()=>{
    await prisma.$disconnect()
})
.catch(async(e) =>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})