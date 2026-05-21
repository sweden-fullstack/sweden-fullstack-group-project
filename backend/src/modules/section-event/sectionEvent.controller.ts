import { Request, Response } from "express"
import sectionEventService from "@/modules/section-event/sectionEvent.service"
import typia from "typia"
import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"
import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"

class SectionEventController {
	async getAllBySectionId(req: Request, res: Response): Promise<Response> {
		const sectionId = parseInt(req.params.sectionId as string)
		const result = await sectionEventService.getAllBySectionId(sectionId)

		return res.status(200).json(result)
	}

	async create(req: Request, res: Response): Promise<Response> {
		const jwt = req.user as JwtPayloadExtended
		const body = typia.assertEquals<SectionEventCreate>(req.body)
		const sectionIdString = req.params.sectionId
			? req.params.sectionId
			: jwt.sectionId
		const sectionId = parseInt(sectionIdString as string)

		const sectionEvent = await sectionEventService.create(
			sectionId,
			jwt.buildingId,
			body,
		)

		return res.status(201).json(sectionEvent)
	}

	async delete(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)

		await sectionEventService.delete(id)
		return res.status(204).send()
	}
}

export default new SectionEventController()
