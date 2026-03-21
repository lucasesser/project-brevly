import type {FastifyInstance} from "fastify"

interface routesType {
    fastify: FastifyInstance,
    options: object
}

export default function routes (fastify: routesType, options: routesType) {
    fastify.get('/', (req, res) => {
        res.send("teste")
    })
}