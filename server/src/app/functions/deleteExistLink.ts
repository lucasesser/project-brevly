import z from "zod"
import { makeLeft, makeRight, type Either } from "../../infra/shared/either"
import { linkNotFound } from "./errors/linkNotFound"
import { db } from "../../infra/db"
import { links } from "../../infra/db/schemas/links"
import { eq } from "drizzle-orm"
import { deleteError } from "./errors/deleteError"

const deleteInputType = z.string()

type deleteInput = z.input<typeof deleteInputType>

export default async function deleteExistLink(input: deleteInput): Promise<Either<linkNotFound | deleteError,string>> {
    const linkID = input

    try {
        const deleted = await db.delete(links).where(eq(links.id, linkID)).returning()

        if(deleted.length > 0){
            console.log(deleted[0].linkEncurtado);
            
            return makeRight(deleted[0].linkEncurtado + " deleted")
        }else {
            return makeLeft(new linkNotFound)
        }
    } catch (error) {
        console.log(error);
        
        return makeLeft(new deleteError)
    }
}