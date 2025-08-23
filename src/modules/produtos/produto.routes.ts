import { Router } from "express"
import { ProdutosController } from "./produto.controller"
import ProdutosService from "./produto.service"
import { ProdutosRepository } from "./produto.repository"

const produtosRoutes = Router()
const produtosService = new ProdutosService(new ProdutosRepository())
const produtosController = new ProdutosController(produtosService)

produtosRoutes
	.route("/produtos")
	.get(produtosController.getProdutos.bind(produtosController))
	.post(produtosController.createProduto.bind(produtosController))

produtosRoutes
	.route("/produtos/count")
	.get(produtosController.getProdutosCount.bind(produtosController))

produtosRoutes
	.route("/produtos/:id")
	.get(produtosController.getProdutoById.bind(produtosController))
	.patch(produtosController.updateProduto.bind(produtosController))
	.delete(produtosController.deleteProduto.bind(produtosController))

export default produtosRoutes
