import z from "zod";
import { Either, makeLeft, makeRight } from "../../infra/shared/either";
import { db } from "../../infra/db";
import { links } from "../../infra/db/schemas/links";
import { eq } from "drizzle-orm";
import { shortLinkNotFound } from "./errors/shortLinkNotFound";
import { searchLinkError } from "./errors/searchLinkError";

const searchLinkSchema = z.string()

type searchInputType = z.input<typeof searchLinkSchema>

export default async function searchLink(shortLink: searchInputType): Promise<Either<shortLinkNotFound | searchLinkError, string>>{
    try {
        const buscaLink = await db.select().from(links).where(eq(links.linkEncurtado, shortLink))
    
        if(buscaLink.length > 0) {
            return makeRight(buscaLink[0].linkOriginal)
        }else {
            return makeLeft(new shortLinkNotFound)
        }
    } catch (error) {
        console.log(error);
        
        return makeLeft(new searchLinkError)
    }
}