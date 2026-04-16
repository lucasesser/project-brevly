import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { exportLinks } from "../../../app/functions/exportLinks";
import z from "zod";

export const exportLinksList: FastifyPluginAsyncZod = async server => {
    server.post(
        "/exportlinks",
        {
            schema: {
                description: "Export Links",
                tags: ["Export Links"]
            }
        },
        async (req, res) => {
            const x = await exportLinks()

            console.log(x);
            

            return res.status(200).send()
        }
    )
}