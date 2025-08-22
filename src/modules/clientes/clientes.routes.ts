import { Router } from "express"
import { ClientesController } from "./clientes.controller"
import ClientesService from "./clientes.service"
import { ClientesRepository } from "./clientes.repository"

const clientesRoutes = Router()
const clientesService = new ClientesService(new ClientesRepository())
const clientesController = new ClientesController(clientesService)

clientesRoutes
	.route("/clientes")
	.get(clientesController.getClientes.bind(clientesController))
	.post(clientesController.createCliente.bind(clientesController))

clientesRoutes
	.route("/clientes/:id")
	.get(clientesController.getClienteById.bind(clientesController))
	.patch(clientesController.updateCliente.bind(clientesController))
	.delete(clientesController.deleteCliente.bind(clientesController))

export default clientesRoutes
