import type { Request, Response } from "express"
import ProdutosService from "./produto.service"

export class ProdutosController {
	constructor(private readonly produtosService: ProdutosService) {}

	async getProdutos(req: Request, res: Response) {
		const { nome }: { nome?: string } = req.query ?? {}
		const produtos = await this.produtosService.getProdutos({
			nome,
		})
		return res.json(produtos.map((produto) => produto.props))
	}

	async getProdutoById(req: Request, res: Response) {
		const { id } = req.params ?? {}
		const produto = await this.produtosService.getProdutoById(id!)
		return res.json(produto?.props)
	}

	async createProduto(req: Request, res: Response) {
		const { nome, preco } = req.body ?? {}
		const produto = await this.produtosService.createProduto({
			nome: nome,
			preco,
		})
		return res.json(produto?.props)
	}

	async updateProduto(req: Request, res: Response) {
		const { id } = req.params ?? {}
		const { nome, preco } = req.body ?? {}
		const produto = await this.produtosService.updateProduto(id!, {
			nome,
			preco,
		})
		return res.json(produto?.props)
	}

	async deleteProduto(req: Request, res: Response) {
		const { id } = req.params ?? {}
		const produto = await this.produtosService.deleteProduto(id!)
		return res.json(produto)
	}

	async getProdutosCount(req: Request, res: Response) {
		const count = await this.produtosService.getProdutosCount()
		return res.json(count)
	}
}
