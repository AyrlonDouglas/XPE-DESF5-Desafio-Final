import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"
import { reset, seed } from "drizzle-seed"
import { count } from "drizzle-orm"

const dbCliente = drizzle({
	connection: process.env.DATABASE_URL!,
	schema,
	casing: "snake_case",
	logger: true,
})

;(async () => await dbCliente.execute("SELECT 1"))()
;(async () => {
	const [{ count: contador }] = await dbCliente
		.select({ count: count() })
		.from(schema.clientesTable)

	if (!contador) {
		await seed(dbCliente, schema).refine((f) => ({
			clientesTable: {
				columns: {
					nome: f.fullName(),
				},
			},
			produtosTable: {
				columns: {
					nome: f.valuesFromArray({
						values: [
							"Camise azul",
							"Camisa Verde",
							"Camisa amarela",
							"Camisa preta",
							"camisa vermelha",
							"camisa cinza",
							"camisa dourada",
							"camisa roxa",
						],
					}),
					preco: f.number({ minValue: 70, maxValue: 150, precision: 1 }),
				},
			},
			pedidosTable: {
				count: 2,
				columns: {
					valor: f.valuesFromArray({ values: [147, 341] }),
				},
			},
			pedidosProdutosTable: {
				count: 4,
			},
		}))
	}
})()

export default dbCliente
