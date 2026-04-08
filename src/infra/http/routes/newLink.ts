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
                    original: z.string(),
                    shortLink: z.string()
                }),
                response: {
                    200: z.object({
                      newLink: z.string()  
                    }),
                    400: z.object({
                        message: z.string()
                    })
                }
            }
        },
        async (req, res) => {
            const {original, shortLink} = req.body

            const createLink = await createNewLink({original, shortLink})

            if(isRight(createLink)){
                res.status(200).send({newLink: shortLink})
                console.log("TESTEEEEE");
                
            }

            const error = unwrapEither(createLink)

            switch(error.constructor.name) {
                case 'insertError':
                    return res.status(400).send({message: error.message})
            }

        }
    )
}
