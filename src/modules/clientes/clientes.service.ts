import { ClientesRepository } from "./clientes.repository"
import { Cliente } from "./clientes.model"

export default class ClientesService {
	constructor(private readonly clientesRepository: ClientesRepository) {}
	async getClientes(filters: { nome?: string }): Promise<Cliente[]> {
		return this.clientesRepository.getClientes(filters)
	}

	async getClienteById(id: string): Promise<Cliente | null> {
		if (!id) throw new TypeError("Id is required")
		return this.clientesRepository.getClienteById(id)
	}

	async createCliente(cliente: Cliente.Props): Promise<Cliente> {
		if (!cliente.nome || !cliente.email)
			throw new TypeError("Nome and email are required")
		return this.clientesRepository.createCliente(cliente)
	}

	async updateCliente(id: string, cliente: Cliente.Props): Promise<Cliente> {
		return this.clientesRepository.updateCliente(id, cliente)
	}

	async deleteCliente(id: string): Promise<null> {
		return this.clientesRepository.deleteCliente(id)
	}

	async getClientesCount(): Promise<number> {
		return this.clientesRepository.getClientesCount()
	}
}
