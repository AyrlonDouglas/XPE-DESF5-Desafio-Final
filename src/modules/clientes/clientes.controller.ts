import type { Request, Response } from "express"
import ClientesService from "./clientes.service"

export class ClientesController {
	constructor(private readonly clientesService: ClientesService) {}

	async getClientes(req: Request, res: Response) {
		const { nome }: { nome?: string } = req.query ?? {}
		const clientes = await this.clientesService.getClientes({
			nome,
		})
		return res.json(clientes.map((cliente) => cliente.props))
	}

	async getClienteById(req: Request, res: Response) {
		const { id } = req.params ?? {}
		const cliente = await this.clientesService.getClienteById(id!)
		return res.json(cliente?.props)
	}

	async createCliente(req: Request, res: Response) {
		const { nome, email } = req.body ?? {}
		const cliente = await this.clientesService.createCliente({
			nome: nome,
			email: email,
		})
		return res.json(cliente?.props)
	}

	async updateCliente(req: Request, res: Response) {
		const { id } = req.params ?? {}
		const { nome, email } = req.body ?? {}
		const cliente = await this.clientesService.updateCliente(id!, {
			nome,
			email,
		})
		return res.json(cliente?.props)
	}

	async deleteCliente(req: Request, res: Response) {
		const { id } = req.params ?? {}
		const cliente = await this.clientesService.deleteCliente(id!)
		return res.json(cliente)
	}

	async getClientesCount(req: Request, res: Response) {
		const count = await this.clientesService.getClientesCount()
		return res.json(count)
	}
}
