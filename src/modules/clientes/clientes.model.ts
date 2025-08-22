import { randomUUID } from "crypto"

export class Cliente {
	private constructor(public readonly props: Cliente.Props) {
		props.id = props.id ?? randomUUID()
	}

	static create(props: Cliente.Props) {
		return new Cliente(props)
	}
}

export namespace Cliente {
	export type Props = {
		id?: string
		nome: string
		email: string
		createdAt?: Date | null
		updatedAt?: Date | null
	}
}
