import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { db, pg } from "../../infra/db";
import { links } from "../../infra/db/schemas/links";
import { stringify } from "csv-stringify";
import { uploadFiles } from "./uploadFiles";

export async function exportLinks(): Promise<string> {
    const {sql, params} = db.select({id: links.id, linkOriginal: links.linkOriginal, linkEncurtado: links.linkEncurtado, accessCount: links.accessCount}).from(links).toSQL()

    const consulta = pg.unsafe(sql, params as string[]).cursor(2)

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
    fileName: "testando123",
    contentType: "csv",
    contentStream: pass
   })

   const x = Promise.all([geraCSV, uploadFile])

    console.log(x);
    
    return "testestes"
}