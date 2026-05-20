import { Request, Response } from "express"
import SectionEventAssigneeService from "@/modules/section-event-assignee/sectionEventAssignee.service"
import typia from "typia"
import SectionEventAssigneeUpdate from "@/shared/types/section-event-assignee/sectionEventAssignee.update"

class SectionEventAssigneeController {
	async overrideAssignees(req: Request, res: Response) {
		const eventId = parseInt(req.params.eventId as string)
		const userIdsDto = typia.assertEquals<SectionEventAssigneeUpdate>(
			req.body,
		)

		const result = await SectionEventAssigneeService.overrideAssignees(
			eventId,
			userIdsDto.userIds,
		)

		return res.status(200).json(result)
	}
}
export default new SectionEventAssigneeController()
