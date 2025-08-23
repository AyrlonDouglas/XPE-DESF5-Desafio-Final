import { Produto } from "@modules/produtos/produto.model"
import { randomUUID } from "crypto"

export class Pedido {
	private constructor(public readonly props: Pedido.Props) {
		props.id = props.id ?? randomUUID()
	}

	static create(props: Pedido.Props) {
		return new Pedido(props)
	}
}

export namespace Pedido {
	export type Props = {
		id?: string
		clienteId: string
		valor: number
		produtos?: Produto[]
		createdAt?: Date | null
		updatedAt?: Date | null
	}
}
