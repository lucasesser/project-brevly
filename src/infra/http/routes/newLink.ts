import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import createNewLink from "../../../app/functions/createNewLink";

export const newLink: FastifyPluginAsyncZod = async server => {
    server.post(
        '/newLink',
        {
            schema: {
                summary: 'Create new link',
                tags: ['Create new link'],
                body: z.object({
                    original: z.string(),
                    shortLink: z.string()
                }),
                response: {
                    200: z.object({
                      newLink: z.string()  
                    })
                }
            }
        },
        (req, res) => {
            const {original, shortLink} = req.body

            createNewLink({original, shortLink})

            res.status(200).send({newLink: shortLink})
        }
    )
}
