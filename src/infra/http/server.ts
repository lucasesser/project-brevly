import fastifyCors from "@fastify/cors";
import {fastify} from "fastify";

const server = fastify()

await server.register(fastifyCors, {origin: '*'}).then(() => {
    console.log("HTTP server running!");
})

server.get('/', (req, res) => {
    res.send("Hello World")
})

server.listen({port: 3333}, (err, adress) => {
    if(err){
        server.log.error(err)
        process.exit(1)
    }
})