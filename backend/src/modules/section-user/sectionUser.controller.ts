import { Request, Response } from "express"
import typia from "typia"
import SectionUserCreate from "@/shared/types/section-user/sectionUser.create"
import sectionUserService from "./sectionUser.service"

class SectionUserController {
	async create(req: Request, res: Response) {
		const body = typia.assertEquals<SectionUserCreate>(req.body)
		const newUser = sectionUserService.create(body)

		res.status(201).json(newUser)
	}
}

export default new SectionUserController()
