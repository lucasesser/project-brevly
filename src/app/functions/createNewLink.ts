import z from "zod";
import { db } from "../../infra/db";
import { links } from "../../infra/db/schemas/links";

const newLinkTypes = z.object({
    original: z.string(),
    shortLink: z.string()
})

type newLinkInput = z.input<typeof newLinkTypes>

export default async function createNewLink(input: newLinkInput) {
    const { original, shortLink } = input

    try {
        await db.insert(links).values({linkOriginal: original, linkEncurtado: shortLink});        
    } catch (error) {
        console.log({error});
    }    
}