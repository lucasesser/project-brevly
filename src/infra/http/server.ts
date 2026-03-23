import fastifyCors from "@fastify/cors";
import {fastify} from "fastify";
import {routes} from "../../app/functions/firstPlugins";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import { transformSwaggerSchema } from "./transform-swagger-schema";

const server = fastify({logger: true})

await server.register(fastifyCors, {origin: '*'}).then(() => {
    console.log("HTTP server running!");
})

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "upload-server",
            version: "1.0.0"
        }
    },
    transform: transformSwaggerSchema
})

server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

server.register(routes)

server.listen({port: 3333}, (err, adress) => {
    if(err){
        server.log.error(err)
        process.exit(1)
    }
})