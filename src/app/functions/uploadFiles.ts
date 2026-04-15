import z from "zod";
import { Upload } from "@aws-sdk/lib-storage"
import { r2 } from "../../infra/storage/client";
import { env } from "../../env";
import { Readable } from "node:stream";

const uploadFilesSchema = z.object({
    folder: z.enum(["downloads"]),
    fileName: z.string(),
    contentType: z.string(),
    contentStream: z.instanceof(Readable)
})

type inputType = z.input<typeof uploadFilesSchema>

export async function uploadFiles(input: inputType) {
    const { folder, fileName, contentType, contentStream } = uploadFilesSchema.parse(input)
    const folderFileName = `${folder}-${fileName}`

    const upload = new Upload({
        client: r2,
        params: {
            Bucket: env.CLOUDFLARE_BUCKET,
            Key: folderFileName,
            Body: contentStream,
            ContentType: contentType
        }
    })

    await upload.done()
}