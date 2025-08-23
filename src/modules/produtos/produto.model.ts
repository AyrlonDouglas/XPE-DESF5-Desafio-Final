import { randomUUID } from "crypto"

export class Produto {
	private constructor(public readonly props: Produto.Props) {
		props.id = props.id ?? randomUUID()
	}

	static create(props: Produto.Props) {
		return new Produto(props)
	}
}

export namespace Produto {
	export type Props = {
		id?: string
		nome: string
		preco: number
		createdAt?: Date | null
		updatedAt?: Date | null
	}
}
