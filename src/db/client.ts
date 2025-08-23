import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"

export default drizzle({
	connection: process.env.DATABASE_URL!,
	schema,
	casing: "snake_case",
})
