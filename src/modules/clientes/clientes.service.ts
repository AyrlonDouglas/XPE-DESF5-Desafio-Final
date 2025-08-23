import { ClientesRepository } from "./clientes.repository"
import { Cliente } from "./clientes.model"

export default class ClientesService {
	constructor(private readonly clientesRepository: ClientesRepository) {}
	async getClientes(filters: { nome?: string }): Promise<Cliente[]> {
		return this.clientesRepository.getClientes(filters)
	}

	async getClienteById(id: string): Promise<Cliente | null> {
		if (!id) throw new Error("Id is required")
		return this.clientesRepository.getClienteById(id)
	}

	async createCliente(cliente: Cliente.Props): Promise<Cliente> {
		if (!cliente.nome || !cliente.email)
			throw new Error("Nome and email are required")

		const alreadyExists = await this.getClienteByEmail(cliente.email)

		if (!!alreadyExists) {
			throw new Error("E-mail já registrado")
		}

		const novoCliente = Cliente.create({
			email: cliente.email,
			nome: cliente.nome,
		})

		return this.clientesRepository.createCliente(novoCliente)
	}

	async getClienteByEmail(email: string): Promise<Cliente | null> {
		return this.clientesRepository.getClienteByEmail(email)
	}

	async updateCliente(id: string, cliente: Cliente.Props): Promise<Cliente> {
		const clienteToUpdate = Cliente.create({ ...cliente, id })

		const clienteInDb = await this.getClienteById(id)
		if (!clienteInDb) {
			throw new Error("Cliente não registrado")
		}

		if (cliente.email) {
			const email = await this.getClienteByEmail(cliente.email)
			if (email) throw new Error("E-mail already exists")
		}

		return this.clientesRepository.updateCliente(id, clienteToUpdate)
	}

	async deleteCliente(id: string): Promise<null> {
		return this.clientesRepository.deleteCliente(id)
	}

	async getClientesCount(): Promise<number> {
		return this.clientesRepository.getClientesCount()
	}
}
