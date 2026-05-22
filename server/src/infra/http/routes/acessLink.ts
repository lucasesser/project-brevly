import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import searchLink from "../../../app/functions/searchLink";
import { isRight, unwrapEither } from "../../shared/either";

export const accessLink: FastifyPluginAsyncZod = async server => {
    server.get(
        "/accesslink/:shorturl",
        {
            schema: {
                description: "access link",
                tags: ["access link"],
                response: {
                    200: z.object({
                        originalUrl: z.string()
                    }),
                    404: z.string(),
                    503: z.string()
                }
            }
        },
        async (req: any, res) => {
            const originalLink = await searchLink(req.params.shorturl)

            if(isRight(originalLink)) {
                return res.status(200).send({originalUrl: originalLink.right})
            }else {
                const error = unwrapEither(originalLink)

                switch(error.constructor.name) {
                    case "shortLinkNotFound":
                        return res.status(404).send(error.message)
                    case "searchLinkError":
                        return res.status(503).send(error.message)
                }
            }
        }
    )
}