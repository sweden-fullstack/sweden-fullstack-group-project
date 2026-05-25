import { Request, Response } from "express"
import sectionEventService from "@/modules/section-event/sectionEvent.service"
import typia from "typia"
import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"
import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import SectionEventUpdate from "@/shared/types/section-event/sectionEvent.update"

class SectionEventController {
	async getAllByBuildingId(req: Request, res: Response): Promise<Response> {
		const jwt = req.user as JwtPayloadExtended
		const buildingIdString = req.params.buildingId
			? req.params.buildingId
			: jwt.buildingId
		const buildingId = parseInt(buildingIdString as string)

		const result = await sectionEventService.getAllByBuildingId(buildingId)
		return res.json(result)
	}

	async getAllBySectionId(req: Request, res: Response): Promise<Response> {
		const jwt = req.user as JwtPayloadExtended
		const sectionIdString = req.params.sectionId
			? req.params.sectionId
			: jwt.sectionId
		const sectionId = parseInt(sectionIdString as string)

		const result = await sectionEventService.getAllBySectionId(sectionId)
		return res.json(result)
	}

	async create(req: Request, res: Response): Promise<Response> {
		const jwt = req.user as JwtPayloadExtended
		const body = typia.misc.assertPrune<SectionEventCreate>(req.body)
		const sectionId = req.params.sectionId
			? parseInt(req.params.sectionId as string)
			: undefined

		const sectionEvent = await sectionEventService.create(
			jwt.buildingId,
			body,
			sectionId,
		)

		return res.status(201).json(sectionEvent)
	}

	async update(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)
		const body = typia.misc.assertPrune<SectionEventUpdate>(req.body)

		const newSection = await sectionEventService.update(id, body)
		return res.status(200).json(newSection)
	}

	async delete(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)

		await sectionEventService.delete(id)
		return res.status(204).send()
	}
}

export default new SectionEventController()
