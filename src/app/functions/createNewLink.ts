import z from "zod";
import { db } from "../../infra/db";
import { links } from "../../infra/db/schemas/links";
import { type Either, makeLeft, makeRight } from "../../infra/shared/either";
import { duplicatedValue } from "./errors/duplicatedValue";
import { insertError } from "./errors/insertError";

const newLinkTypes = z.object({
    original: z.string(),
    shortLink: z.string()
})

type newLinkInput = z.input<typeof newLinkTypes>

export default async function createNewLink(input: newLinkInput): Promise<Either<insertError | duplicatedValue,string>> {
    const { original, shortLink } = input

    try {
        await db.insert(links).values({linkOriginal: original, linkEncurtado: shortLink});  

        return makeRight("") 
    } catch (error: any) {
        if(error.cause?.code === '23505') {       
            return makeLeft(new duplicatedValue)
        }
        
        return makeLeft(new insertError)
    }    
}