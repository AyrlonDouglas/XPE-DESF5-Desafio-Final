import { Cliente } from "./clientes.model"
import { db } from "../../db"
import { clientesTable } from "../../db/schema"
import { eq } from "drizzle-orm"

export class ClientesRepository {
	async getClientes(): Promise<Cliente[]> {
		const clientesFromDb = await db.select().from(clientesTable)
		return clientesFromDb.map((cliente) =>
			Cliente.create({
				id: cliente.id.toString(),
				nome: cliente.nome,
				email: cliente.email,
				createdAt: cliente.createdAt,
				updatedAt: cliente.updatedAt,
			})
		)
	}

	async getClienteById(id: string): Promise<Cliente | null> {
		const [cliente] = await db
			.select()
			.from(clientesTable)
			.where(eq(clientesTable.id, parseInt(id)))

		return cliente
			? Cliente.create({
					id: cliente.id.toString(),
					nome: cliente.nome,
					email: cliente.email,
					createdAt: cliente.createdAt,
					updatedAt: cliente.updatedAt,
			  })
			: null
	}

	async createCliente(cliente: Cliente.Props): Promise<Cliente> {
		const [newCliente] = await db
			.insert(clientesTable)
			.values(cliente)
			.returning()
		if (!newCliente) throw new Error("Failed to create cliente")
		return Cliente.create({
			id: newCliente.id.toString(),
			nome: newCliente.nome,
			email: newCliente.email,
			createdAt: newCliente.createdAt,
			updatedAt: newCliente.updatedAt,
		})
	}

	async updateCliente(id: string, cliente: Cliente.Props): Promise<Cliente> {
		const [updatedCliente] = await db
			.update(clientesTable)
			.set(cliente)
			.where(eq(clientesTable.id, parseInt(id)))
			.returning()

		if (!updatedCliente) throw new Error("Failed to update cliente")
		return Cliente.create({ ...updatedCliente, id })
	}

	async deleteCliente(id: string): Promise<null> {
		await db.delete(clientesTable).where(eq(clientesTable.id, parseInt(id)))
		return null
	}
}
