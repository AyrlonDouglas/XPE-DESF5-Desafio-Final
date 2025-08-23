import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"

const dbCliente = drizzle({
	connection: process.env.DATABASE_URL!,
	schema,
	casing: "snake_case",
	logger: true,
})

;(async () => await dbCliente.execute("SELECT 1"))()

export default dbCliente
