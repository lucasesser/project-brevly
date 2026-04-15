import dotenv from 'dotenv'
import z from "zod"; 

dotenv.config()

const envSchema = z.object({
    DATABASE_URL: z.url().startsWith("postgres://"),
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
    CLOUDFLARE_BUCKET: z.string(),
    CLOUDFLARE_PUBLIC_URL: z.string()
})

export const env = envSchema.parse(process.env)