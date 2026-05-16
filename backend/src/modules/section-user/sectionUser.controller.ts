import { Request, Response } from "express"
import typia from "typia"
import SectionUserCreate from "@/shared/types/section-user/sectionUser.create"
import sectionUserService from "./sectionUser.service"
import SectionUserUpdate from "@/shared/types/section-user/sectionUser.update"

class SectionUserController {
	async create(req: Request, res: Response) {
		const body = typia.assertEquals<SectionUserCreate>(req.body)
		const sectionId = parseInt(req.params.sectionId as string)
		const newUser = sectionUserService.create(sectionId, body)

		res.status(201).json(newUser)
	}

	async update(req: Request, res: Response) {
		const userId = parseInt(req.params.userId as string)
		const sectionId = parseInt(req.params.sectionId as string)
		const body = typia.assertEquals<SectionUserUpdate>(req.body)

		const newUser = await sectionUserService.update(sectionId, userId, body)
		return res.status(200).json(newUser)
	}

	async delete(req: Request, res: Response) {
		const userId = parseInt(req.params.userId as string)
		const sectionId = parseInt(req.params.sectionId as string)

		await sectionUserService.delete(sectionId, userId)
		return res.status(204).send()
	}
}

export default new SectionUserController()
