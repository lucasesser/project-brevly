import z from "zod"; 

const envSchema = z.object({
    DATABASE_URL: z.url().startsWith("postgres://")
})
console.log(process.env.DATABASE_URL);

export const env = envSchema.parse(process.env)