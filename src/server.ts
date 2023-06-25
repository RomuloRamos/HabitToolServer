// import * as dotenv from 'dotenv';
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes';

// dotenv.config();

const app = Fastify();


app.register(cors);
app.register(appRoutes);

app. listen({
    port: parseInt(process.env.PORT as string), 
    host: process.env.SERVER_ADDR
}).then(()=>{
    console.log("HTTP - Server Running")
}); 