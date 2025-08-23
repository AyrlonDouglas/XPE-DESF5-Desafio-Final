import { Router } from "express"
import { PedidosController } from "./pedidos.controller"
import PedidosService from "./pedidos.service"
import { PedidosRepository } from "./pedidos.repository"
import ProdutosService from "@modules/produtos/produto.service"
import { ProdutosRepository } from "@modules/produtos/produto.repository"

const pedidosRoutes = Router()
const pedidosService = new PedidosService(
	new PedidosRepository(),
	new ProdutosService(new ProdutosRepository())
)
const pedidosController = new PedidosController(pedidosService)

pedidosRoutes
	.route("/pedidos")
	.get(pedidosController.getPedidos.bind(pedidosController))
	.post(pedidosController.createPedido.bind(pedidosController))

pedidosRoutes
	.route("/pedidos/count")
	.get(pedidosController.getPedidosCount.bind(pedidosController))

pedidosRoutes
	.route("/pedidos/:id")
	.get(pedidosController.getPedidoById.bind(pedidosController))
	.delete(pedidosController.deletePedido.bind(pedidosController))

export default pedidosRoutes
