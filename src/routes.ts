import { Router } from "express"
import clientesRoutes from "./modules/clientes/clientes.routes"

const routes = Router()

routes.use(clientesRoutes)

export default routes
