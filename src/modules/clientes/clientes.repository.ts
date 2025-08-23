import { Cliente } from "./clientes.model"
import db from "@db/client"
import { clientesTable } from "@db/schema"
import { count, eq, ilike } from "drizzle-orm"

export class ClientesRepository {
	async getClientes(filters: { nome?: string }): Promise<Cliente[]> {
		const query = db.select().from(clientesTable)
		if (filters.nome) {
			query.where(ilike(clientesTable.nome, `%${filters.nome}%`))
		}
		const clientesFromDb = await query
		return clientesFromDb.map((cliente) =>
			this.mapClienteFromDbToModel(cliente)
		)
	}

	async getClientesCount(): Promise<number> {
		const clientesCount = await db
			.select({ count: count() })
			.from(clientesTable)
		return clientesCount[0].count ?? 0
	}

	async getClienteById(id: string): Promise<Cliente | null> {
		const [cliente] = await db
			.select()
			.from(clientesTable)
			.where(eq(clientesTable.id, parseInt(id)))

		return cliente ? this.mapClienteFromDbToModel(cliente) : null
	}

	async createCliente(cliente: Cliente): Promise<Cliente> {
		delete cliente.props.id

		const [newCliente] = await db
			.insert(clientesTable)
			.values(cliente.props)
			.returning()
		if (!newCliente) throw new Error("Failed to create cliente")
		return this.mapClienteFromDbToModel(newCliente)
	}

	async updateCliente(id: string, cliente: Cliente): Promise<Cliente> {
		delete cliente.props.id

		const [updatedCliente] = await db
			.update(clientesTable)
			.set(cliente.props)
			.where(eq(clientesTable.id, parseInt(id)))
			.returning()

		if (!updatedCliente) throw new Error("Failed to update cliente")
		return this.mapClienteFromDbToModel(updatedCliente)
	}

	async deleteCliente(id: string): Promise<null> {
		await db.delete(clientesTable).where(eq(clientesTable.id, parseInt(id)))
		return null
	}

	async getClienteByEmail(email: string): Promise<Cliente | null> {
		const [cliente] = await db
			.select()
			.from(clientesTable)
			.where(eq(clientesTable.email, email))

		return cliente ? this.mapClienteFromDbToModel(cliente) : null
	}

	private mapClienteFromDbToModel(
		cliente: typeof clientesTable.$inferSelect
	): Cliente {
		return Cliente.create({
			id: cliente.id.toString(),
			nome: cliente.nome,
			email: cliente.email,
			createdAt: cliente.createdAt,
			updatedAt: cliente.updatedAt,
		})
	}
}
