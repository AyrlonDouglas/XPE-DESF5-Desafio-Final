import { Pedido } from "./pedidos.model"
import db from "@db/client"
import { pedidosProdutosTable, pedidosTable, produtosTable } from "@db/schema"
import { Produto } from "@modules/produtos/produto.model"
import { count, eq } from "drizzle-orm"

export class PedidosRepository {
	async getPedidos(): Promise<Pedido[]> {
		const pedidosFromDb = await db.select().from(pedidosTable)
		return pedidosFromDb.map((pedido) => this.mapPedidoFromDbToModel(pedido))
	}
	async getPedidosCount(): Promise<number> {
		const pedidosCount = await db.select({ count: count() }).from(pedidosTable)
		return pedidosCount[0].count ?? 0
	}
	async getPedidoById(id: string): Promise<Pedido | null> {
		const [pedido] = await db
			.select()
			.from(pedidosTable)
			.where(eq(pedidosTable.id, parseInt(id)))
		return pedido ? this.mapPedidoFromDbToModel(pedido) : null
	}

	async createPedido(pedido: Pedido): Promise<Pedido> {
		const { pedidoCriado, pedidosProdutos } = await db.transaction(
			async (tx) => {
				const [pedidoCriado] = await tx
					.insert(pedidosTable)
					.values({
						clienteId: Number(pedido.props.clienteId),
						valor: pedido.props.valor,
					})
					.returning()

				const pedidosProdutosPromises = pedido.props.produtos!.map(
					async (produto) => {
						const [novoPedidoProduto] = await tx
							.insert(pedidosProdutosTable)
							.values({
								pedidoId: pedidoCriado.id,
								produtoId: Number(produto.props.id),
							})
							.returning()
						return novoPedidoProduto
					}
				)

				const pedidosProdutos = await Promise.all(pedidosProdutosPromises)

				return { pedidoCriado, pedidosProdutos }
			}
		)

		return this.mapPedidoFromDbToModel(pedidoCriado)
	}

	async deletePedido(id: string): Promise<null> {
		await db.delete(pedidosTable).where(eq(pedidosTable.id, parseInt(id)))
		return null
	}
	private mapPedidoFromDbToModel(
		pedido: typeof pedidosTable.$inferSelect,
		produtos?: (typeof produtosTable.$inferSelect)[]
	): Pedido {
		return Pedido.create({
			id: pedido.id.toString(),
			clienteId: pedido.clienteId.toString(),
			valor: pedido.valor,
			produtos: produtos?.map((produto) =>
				Produto.create({
					id: produto.id.toString(),
					nome: produto.nome,
					preco: produto.preco,
				})
			),
			createdAt: pedido.createdAt,
			updatedAt: pedido.updatedAt,
		})
	}
}
