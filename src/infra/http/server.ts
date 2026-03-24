import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { fastify } from "fastify";
import { routes } from "../../app/functions/firstPlugins";

const server = fastify({logger: true})

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

await server.register(fastifyCors, {origin: '*'})

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "upload-server",
            version: "1.0.0"
        }
    },
    transform: jsonSchemaTransform
})

server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

server.register(routes)

server.listen({port: 3333}, (err) => {   
    if(err){
        server.log.error(err)
        process.exit(1)
    }
})