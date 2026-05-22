import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import getUrls from "../../../app/functions/getrUrls";
import z from "zod";
import { isRight, unwrapEither } from "../../shared/either";

export const listUrls: FastifyPluginAsyncZod = async server => {
    server.get(
        "/listurls",
        {
            schema: {
                description: "List all urls",
                tags: ["List all urls"],
                response: {
                    200: z.array(
                        z.object({
                            id: z.string(),
                            linkOriginal: z.string(),
                            linkEncurtado: z.string(),
                            accessCount: z.number()
                        })
                    ),
                    503: z.string().default("Error occurred while get Urls")
                }
            }
        },
        async (req, res) => {
            const urls = await getUrls()

            if(isRight(urls)) {
                return res.status(200).send(urls.right)
            }else {
                const error = unwrapEither(urls)

                switch(error.constructor.name) {
                    case "getUrlsError":
                        return res.status(503).send(error.message)
                }
            }
        }
    )
}