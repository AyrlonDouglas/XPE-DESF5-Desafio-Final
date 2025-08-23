import { Produto } from "./produto.model"
import { ProdutosRepository } from "./produto.repository"

export default class ProdutosService {
	constructor(private readonly produtosRepository: ProdutosRepository) {}
	async getProdutos(filters: { nome?: string }): Promise<Produto[]> {
		return this.produtosRepository.getProdutos(filters)
	}

	async getProdutoById(id: string): Promise<Produto | null> {
		if (!id) throw new TypeError("Id is required")
		return this.produtosRepository.getProdutoById(id)
	}

	async createProduto(produto: Produto.Props): Promise<Produto> {
		if (!produto.nome || !produto.preco)
			throw new TypeError("Nome and preco are required")
		const novoProduto = Produto.create(produto)
		return this.produtosRepository.createProduto(novoProduto)
	}

	async updateProduto(id: string, produto: Produto.Props): Promise<Produto> {
		const produtoInDB = await this.getProdutoById(id)
		if (!produtoInDB) {
			throw new Error("Produto não registrado")
		}
		const produtoParaUpdate = Produto.create(produto)

		return this.produtosRepository.updateProduto(id, produtoParaUpdate)
	}

	async deleteProduto(id: string): Promise<null> {
		return this.produtosRepository.deleteProduto(id)
	}

	async getProdutosCount(): Promise<number> {
		return this.produtosRepository.getProdutosCount()
	}

	async getProdutosByIds(ids: string[]): Promise<Produto[]> {
		if (!ids || !ids.length) throw new TypeError("Ids are required")
		return this.produtosRepository.getProdutosByIds(ids)
	}
}
