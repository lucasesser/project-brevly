import z from "zod";
import { Upload } from "@aws-sdk/lib-storage"
import { r2 } from "../../infra/storage/client";
import { env } from "../../env";
import { Readable } from "node:stream";
import { basename, dirname, extname, relative, toNamespacedPath } from "node:path";
import { randomUUID } from "node:crypto";

const uploadFilesSchema = z.object({
    folder: z.enum(["downloads"]),
    fileName: z.string(),
    contentType: z.string(),
    contentStream: z.instanceof(Readable)
})

type inputType = z.input<typeof uploadFilesSchema>

export async function uploadFiles(input: inputType) {
    const { folder, fileName, contentType, contentStream } = uploadFilesSchema.parse(input)

    const fileExtension = extname(fileName)
    const fileBaseName = basename(fileName)
    
    const sanitizedFileBaseName = fileBaseName.replace(
        /[^a-zA-Z0-9]/g,
        ""
    )
    const finalFileName = sanitizedFileBaseName.concat(fileExtension)

    const uniqueFileName = `${folder}/${randomUUID()}-${finalFileName}`

    const upload = new Upload({
        client: r2,
        params: {
            Bucket: env.CLOUDFLARE_BUCKET,
            Key: uniqueFileName,
            Body: contentStream,
            ContentType: contentType
        }
    })

    await upload.done()
    
    return {
        key: uniqueFileName,
        url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString()
    }
}