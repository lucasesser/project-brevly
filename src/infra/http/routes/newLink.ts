import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import createNewLink from "../../../app/functions/createNewLink";
import { isRight, unwrapEither } from "../../shared/either";

export const newLink: FastifyPluginAsyncZod = async server => {
    server.post(
        '/newLink',
        {
            schema: {
                summary: 'Create new link',
                tags: ['Create new link'],
                body: z.object({
                    original: z.url(),
                    shortLink: z.string().min(2).max(60).regex(/^[a-zA-Z0-9]+$/, "Alphanumeric only, no spaces")
                }),
                response: {
                    200: z.object({
                      newLink: z.string()  
                    }),
                    409: z.string().default('The "original" value alredys exists.'),
                    503: z.string().default("Service Unavailable")
                }
            }
        },
        async (req, res) => {
            const {original, shortLink} = req.body

            const createLink = await createNewLink({original, shortLink})

            if(isRight(createLink)){
                return res.status(200).send({newLink: shortLink})
            }else {
                const error = unwrapEither(createLink) 
                
                switch(error.constructor.name) {
                    case 'duplicatedValue':
                        return res.status(409).send(error.message)
                    case 'insertError':
                        return res.status(503).send(error.message)
                } 
            }
        }
    )
}
