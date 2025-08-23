import { Produto } from "./produto.model"
import db from "@db/client"
import { produtosTable } from "@db/schema"
import { count, eq, ilike, inArray } from "drizzle-orm"

export class ProdutosRepository {
	async getProdutos(filters: { nome?: string }): Promise<Produto[]> {
		const query = db.select().from(produtosTable)
		if (filters.nome) {
			query.where(ilike(produtosTable.nome, `%${filters.nome}%`))
		}
		const produtosFromDb = await query
		return produtosFromDb.map((produto) =>
			this.mapProdutoFromDbToModel(produto)
		)
	}

	async getProdutosCount(): Promise<number> {
		const produtosCount = await db
			.select({ count: count() })
			.from(produtosTable)
		return produtosCount[0].count ?? 0
	}

	async getProdutoById(id: string): Promise<Produto | null> {
		const [produto] = await db
			.select()
			.from(produtosTable)
			.where(eq(produtosTable.id, parseInt(id)))

		return produto ? this.mapProdutoFromDbToModel(produto) : null
	}

	async createProduto(produto: Produto): Promise<Produto> {
		delete produto.props.id
		const [newProduto] = await db
			.insert(produtosTable)
			.values(produto.props)
			.returning()
		if (!newProduto) throw new Error("Failed to create produto")
		return this.mapProdutoFromDbToModel(newProduto)
	}

	async updateProduto(id: string, produto: Produto): Promise<Produto> {
		delete produto.props.id
		const [updatedProduto] = await db
			.update(produtosTable)
			.set(produto.props)
			.where(eq(produtosTable.id, parseInt(id)))
			.returning()

		if (!updatedProduto) throw new Error("Failed to update produto")
		return this.mapProdutoFromDbToModel(updatedProduto)
	}

	async deleteProduto(id: string): Promise<null> {
		await db.delete(produtosTable).where(eq(produtosTable.id, parseInt(id)))
		return null
	}

	async getProdutosByIds(ids: string[]): Promise<Produto[]> {
		const produtosFromDb = await db
			.select()
			.from(produtosTable)
			.where(inArray(produtosTable.id, ids.map(Number)))

		return produtosFromDb.map((produto) =>
			this.mapProdutoFromDbToModel(produto)
		)
	}

	private mapProdutoFromDbToModel(
		produto: typeof produtosTable.$inferSelect
	): Produto {
		return Produto.create({
			id: produto.id.toString(),
			nome: produto.nome,
			preco: produto.preco,
			createdAt: produto.createdAt,
			updatedAt: produto.updatedAt,
		})
	}
}
