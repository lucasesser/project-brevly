import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { exportLinks } from "../../../app/functions/exportLinks";
import z from "zod";
import { isRight } from "../../shared/either";

export const exportLinksList: FastifyPluginAsyncZod = async server => {
    server.post(
        "/exportlinks",
        {
            schema: {
                summary: "Export Links",
                tags: ["Export Links"],
                body: z.object({
                    searchQuery: z.string().optional()
                }),
                response: {
                    200: z.object({url: z.url().startsWith("https://")}),
                    500: z.undefined()
                }
            }
        },
        async (req, res) => {
            const exported = await exportLinks({})       
            
            if(isRight(exported)){
                return res.status(200).send(exported.right)
            }else {
                return res.status(500)
            }
        }
    )
}