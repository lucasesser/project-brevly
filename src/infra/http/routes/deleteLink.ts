import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import deleteExistLink from "../../../app/functions/deleteExistLink";
import { isLeft, isRight, unwrapEither } from "../../shared/either";

export const deleteLink: FastifyPluginAsyncZod = async server => {
    server.post(
        "/deletelink",
        {
            schema: {
                summary: "Delete link",
                tags: ["Delete link"],
                body: z.object({
                    uuid: z.string()
                }),
                response:{
                    200: z.string(),
                    404: z.string().default("The link was not found."),
                    503: z.string("Error during delete process.")
                }
            }
        },
        async (req, res) => {
            const {uuid} = req.body

            const deleteFunction = await deleteExistLink(uuid)

            if(isRight(deleteFunction)){
                return res.status(200).send(deleteFunction.right)
            }else {
                const error = unwrapEither(deleteFunction)
                switch(error.constructor.name){
                    case "linkNotFound":
                        return res.status(404).send(error.message)
                    case "deleteError":
                        return res.status(503).send(error.message)
                }
            }
        }
    )
}