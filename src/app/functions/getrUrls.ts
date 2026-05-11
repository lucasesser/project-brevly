import z from "zod";
import { db } from "../../infra/db";
import { links } from "../../infra/db/schemas/links";
import { Either, makeLeft, makeRight } from "../../infra/shared/either";
import { getUrlsError } from "./errors/getUrlsError";

const responseSchema = z.array(
    z.object({
        id: z.string(),
        linkOriginal: z.string(),
        linkEncurtado: z.string(),
        accessCount: z.number()
    })
)

type responseType = z.output<typeof responseSchema>

export default async function getUrls(): Promise<Either<getUrlsError, responseType>> {
    try {
        const urls = await db.select().from(links)

            return makeRight(urls)
    } catch (error) {
        return makeLeft(new getUrlsError)
    }    
}