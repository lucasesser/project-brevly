import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { db, pg } from "../../infra/db";
import { links } from "../../infra/db/schemas/links";
import { stringify } from "csv-stringify";
import { uploadFiles } from "./uploadFiles";
import { Either, makeRight } from "../../infra/shared/either";
import z from "zod";
import { ilike } from "drizzle-orm";

const inputSchema = z.object({
  searchQuery: z.string().optional()
})

type inputType = z.input<typeof inputSchema>

type exportLinksOutput = {
  url: string
}

export async function exportLinks(input: inputType): Promise<Either<never, exportLinksOutput>> {
  const {searchQuery} = inputSchema.parse(input)

  const {sql, params} = db
    .select({
      id: links.id,
      linkOriginal: links.linkOriginal,
      linkEncurtado: links.linkEncurtado,
      accessCount: links.accessCount
    })
    .from(links)
    .where(
      searchQuery ? ilike(links.linkOriginal, `%${searchQuery}%`) : undefined
    )
    .toSQL()

  const consulta = pg.unsafe(sql, params as string[]).cursor(5)

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      {key: "id", header: "ID"},
      {key: "linkOriginal", header: "Link original"},
      {key: "linkEncurtado", header: "Link encurtado"},
      {key: "accessCount", header: "Contagem de acesso"}
    ]
  })

  const pass = new PassThrough() 

  const geraCSV = pipeline(
    consulta,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
  csv,
  pass
  )

  const uploadFile = uploadFiles({
  folder: "downloads",
  fileName: `${new Date().toISOString()}-links.csv`,
  contentType: "csv",
  contentStream: pass
  })

  const [{url}] = await Promise.all([uploadFile ,geraCSV])
  
  return makeRight({url})
}