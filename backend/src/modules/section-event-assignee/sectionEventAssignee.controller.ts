import { Request, Response } from "express"
import SectionEventAssigneeService from "@/modules/section-event-assignee/sectionEventAssignee.service"

class SectionEventAssigneeController {
	async updateAssignee(req: Request, res: Response) {
		const eventId = parseInt(req.params.eventId as string)
		const userIds: number[] = req.body.userIds || []

		const result = await SectionEventAssigneeService.update(
			eventId,
			userIds,
		)

		return res.status(200).json(result)
	}
}
export default new SectionEventAssigneeController()
