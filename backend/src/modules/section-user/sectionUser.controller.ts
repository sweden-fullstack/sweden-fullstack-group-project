import { Request, Response } from "express"
import typia from "typia"
import SectionUserCreate from "@/shared/types/section-user/sectionUser.create"
import sectionUserService from "./sectionUser.service"
import SectionUserUpdate from "@/shared/types/section-user/sectionUser.update"
import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import ForbiddenError from "@/errors/ForbiddenError"
import sectionService from "../section/section.service"

class SectionUserController {
	async getByBuildingId(req: Request, res: Response) {
		const jwt = req.user as JwtPayloadExtended
		const buildingId = parseInt(req.params.buildingId as string)

		if (jwt.userRole !== "admin" && jwt.buildingId !== buildingId) {
			throw new ForbiddenError()
		}

		const result = await sectionUserService.getAllByBuildingId(buildingId)
		res.json(result)
	}

	async getBySectionId(req: Request, res: Response) {
		const jwt = req.user as JwtPayloadExtended
		const sectionId = parseInt(req.params.sectionId as string)
		const section = await sectionService.getById(sectionId)

		if (jwt.userRole !== "admin" && jwt.buildingId !== section.buildingId) {
			throw new ForbiddenError()
		}

		const result = await sectionUserService.getAllBySectionId(sectionId)
		res.json(result)
	}

	async getByAuthentication(req: Request, res: Response) {
		const jwt = req.user as JwtPayloadExtended
		const user = await sectionUserService.getBySectionIdAndUserId(
			jwt.sectionId,
			jwt.userId,
		)

		res.json(user)
	}

	async create(req: Request, res: Response) {
		const body = typia.assertEquals<SectionUserCreate>(req.body)
		const sectionId = parseInt(req.params.sectionId as string)
		const newUser = await sectionUserService.create(sectionId, body)

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
