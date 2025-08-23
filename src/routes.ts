import { Router } from "express"
import clientesRoutes from "@modules/clientes/clientes.routes"
import pedidosRoutes from "@modules/pedidos/pedidos.routes"
import produtosRoutes from "@modules/produtos/produto.routes"

const routes = Router()

routes.use(clientesRoutes)
routes.use(pedidosRoutes)
routes.use(produtosRoutes)

export default routes
