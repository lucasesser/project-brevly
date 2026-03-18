import fastifyCors from "@fastify/cors";
import {fastify} from "fastify";

const server = fastify()

server.register(fastifyCors, {origin: '*'}).then(() => {
    console.log("HTTP server runnning!");    
})