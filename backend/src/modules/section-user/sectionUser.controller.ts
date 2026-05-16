import { Request, Response } from "express"
import typia from "typia"
import SectionUserCreate from "@/shared/types/section-user/sectionUser.create"
import sectionUserService from "./sectionUser.service"
import SectionUserUpdate from "@/shared/types/section-user/sectionUser.update"

class SectionUserController {
	async create(req: Request, res: Response) {
		const body = typia.assertEquals<SectionUserCreate>(req.body)
		const newUser = sectionUserService.create(body)

		res.status(201).json(newUser)
	}

	async update(req: Request, res: Response) {
		const id = parseInt(req.params.userId as string)
		const body = typia.assertEquals<SectionUserUpdate>(req.body)

		const newUser = await sectionUserService.update(id, body)
		return res.status(200).json(newUser)
	}
}

export default new SectionUserController()
