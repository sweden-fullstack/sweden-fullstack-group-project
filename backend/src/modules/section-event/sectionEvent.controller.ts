import { Request, Response } from "express"
import sectionEventService from "@/modules/section-event/sectionEvent.service"
import typia from "typia"
import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"

class SectionEventController {
	async create(req: Request, res: Response): Promise<Response> {
		const body = typia.assertEquals<SectionEventCreate>(req.body)
		const sectionId = parseInt(req.params.sectionId as string)
		const sectionEvent = await sectionEventService.create(sectionId, body)

		return res.status(201).json(sectionEvent)
	}

	async getEventBySectionId(req: Request, res: Response): Promise<Response> {
		const sectionId = parseInt(req.params.sectionId as string)
		const result = await sectionEventService.getBySection(sectionId)

		return res.status(200).json(result)
	}

	async delete(req: Request, res: Response) {
		const eventId = parseInt(req.params.eventId as string)

		await sectionEventService.delete(eventId)
		return res.status(204).send()
	}
}

export default new SectionEventController()
