import * as z from "zod"

const envSchema = z.object({
  "DB_URL": z.url(),
  "ACCESS_TOKEN_SECRET": z.string(),
  "REFRESH_TOKEN_SECRET": z.string(),
  "PORT": z.coerce.number(),
})

const env = envSchema.parse(process.env)

export default env