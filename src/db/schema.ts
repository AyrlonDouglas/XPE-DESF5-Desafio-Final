import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"

const baseTable = {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
}

export const clientesTable = pgTable("clientes", {
	...baseTable,
	nome: text().notNull(),
	email: text().notNull().unique(),
})

export const produtosTable = pgTable("produtos", {
	...baseTable,
	nome: text().notNull(),
	preco: integer().notNull(),
})

export const pedidosTable = pgTable("pedidos", {
	...baseTable,
	clienteId: integer().references(() => clientesTable.id),
	valor: integer().notNull(),
	produtoId: integer()
		.references(() => produtosTable.id)
		.notNull(),
})
