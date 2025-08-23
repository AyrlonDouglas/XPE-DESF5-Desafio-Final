import type { Request, Response } from "express"
import PedidosService from "./pedidos.service"

export class PedidosController {
	constructor(private readonly pedidosService: PedidosService) {}

	async getPedidos(req: Request, res: Response) {
		const pedidos = await this.pedidosService.getPedidos()
		return res.json(pedidos.map((pedido) => pedido.props))
	}

	async getPedidoById(req: Request, res: Response) {
		const { id } = req.params ?? {}
		const pedido = await this.pedidosService.getPedidoById(id!)
		return res.json(pedido?.props)
	}

	async createPedido(req: Request, res: Response) {
		const { produtoIds, clienteId } = req.body ?? {}
		const pedido = await this.pedidosService.createPedido({
			produtoIds,
			clienteId,
		})
		return res.json(pedido?.props)
	}

	async deletePedido(req: Request, res: Response) {
		const { id } = req.params ?? {}
		const pedido = await this.pedidosService.deletePedido(id!)
		return res.json(pedido)
	}

	async getPedidosCount(req: Request, res: Response) {
		const count = await this.pedidosService.getPedidosCount()
		return res.json(count)
	}
}
