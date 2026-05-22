import { env } from "../../env";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { hasZodFastifySchemaValidationErrors, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { newLink } from "./routes/newLink";
import { deleteLink } from "./routes/deleteLink";
import { accessLink } from "./routes/acessLink";
import { listUrls } from "./routes/listUrls";
import { exportLinksList } from "./routes/exportLinksList";

const server = fastify({logger: true})

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.validation
        })
    }
})

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

server.register(newLink)
server.register(deleteLink)
server.register(accessLink)
server.register(listUrls)
server.register(exportLinksList)

server.listen({
    port: env.PORT,
    host: '0.0.0.0'
}, (err) => {   
    if(err){
        server.log.error(err)
        process.exit(1)
    }
})