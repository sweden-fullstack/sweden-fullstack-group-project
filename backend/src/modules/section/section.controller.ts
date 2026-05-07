import { Request, Response } from "express"
import SectionService from "./section.service"
import SectionUpdate from "@/shared/types/section/section.update"
import SectionCreate from "@/shared/types/section/section.create"

class SectionController {
	async getAll(_req: Request, res: Response) {
		const sections = await SectionService.getAll()
		res.json(sections)
	}

	async getById(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)

		const section = await SectionService.getById(id)
		res.json(section)
	}

	async create(req: Request, res: Response) {
		const body = req.body as SectionCreate
		const newSection = await SectionService.create(body)

		res.status(201).json(newSection)
	}

	async update(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)
		const body = req.body as SectionUpdate

		const newSection = await SectionService.update(id, body)
		return res.status(200).json(newSection)
	}

	async delete(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)

		await SectionService.delete(id)
		return res.status(204).send()
	}
}

export default new SectionController()
