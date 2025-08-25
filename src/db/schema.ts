import { integer, pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core"

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
	preco: numeric().notNull(),
})

export const pedidosTable = pgTable("pedidos", {
	...baseTable,
	clienteId: integer()
		.references(() => clientesTable.id)
		.notNull(),
	valor: numeric().notNull(),
})

export const pedidosProdutosTable = pgTable("pedidos_produtos", {
	pedidoId: integer()
		.references(() => pedidosTable.id, { onDelete: "cascade" })
		.notNull(),
	produtoId: integer()
		.references(() => produtosTable.id)
		.notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
})
