import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

export const routes: FastifyPluginAsyncZod = async server => {
    server.get('/', (req, res) => {
        return res.send("teste")
    })

    server.post(
        '/teste',
        {
            schema: {
                summary: 'testando',
                tags: ['testeteste'],
                querystring: z.object({item1: z.string()}),
                response: {200: z.string()}
            }
        },
        async (req, res) => {
            const t: string = 'teste123123'
            return res.status(200).send(t)
    })
}