<<<<<<< HEAD
import z from "zod";
import { db } from "../../infra/db";
import { links } from "../../infra/db/schemas/links";

const newLinkTypes = z.object({
    original: z.string(),
    shortLink: z.string()
})

type newLinkInput = z.input<typeof newLinkTypes>

export default function createNewLink(input: newLinkInput) {
    const { original, shortLink } = input

    const teste = db.insert(links).values({linkOriginal: original, linkEncurtado: shortLink})

    console.log(teste);
    
}
=======
import { db } from "../../infra/db";
>>>>>>> ba074f5269a2861d027e02ff2235604f75c87064
