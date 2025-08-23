import { PedidosRepository } from "./pedidos.repository"
import { Pedido } from "./pedidos.model"
import ProdutosService from "@modules/produtos/produto.service"
import { Produto } from "@modules/produtos/produto.model"

export default class PedidosService {
	constructor(
		private readonly pedidosRepository: PedidosRepository,
		private readonly produtosService: ProdutosService
	) {}
	async getPedidos(): Promise<Pedido[]> {
		return this.pedidosRepository.getPedidos()
	}

	async getPedidoById(id: string): Promise<Pedido | null> {
		if (!id) throw new TypeError("Id is required")
		return this.pedidosRepository.getPedidoById(id)
	}

	async createPedido(pedido: {
		produtoIds: string[]
		clienteId: string
	}): Promise<Pedido> {
		if (!pedido.produtoIds || !pedido.produtoIds.length || !pedido.clienteId)
			throw new TypeError("Produto ids and cliente id are required")

		const produtos = await this.produtosService.getProdutosByIds(
			pedido.produtoIds
		)

		if (!produtos || !produtos.length) throw new TypeError("Produtos not found")

		const novoPedido = Pedido.create({
			produtos,
			clienteId: pedido.clienteId,
			valor: produtos.reduce((acc, produto) => acc + produto.props.preco, 0),
		})
		return this.pedidosRepository.createPedido(novoPedido)
	}

	async deletePedido(id: string): Promise<null> {
		return this.pedidosRepository.deletePedido(id)
	}

	async getPedidosCount(): Promise<number> {
		return this.pedidosRepository.getPedidosCount()
	}
}
