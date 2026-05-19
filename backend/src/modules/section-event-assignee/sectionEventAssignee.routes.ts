import { Router } from "express"
import sectionEventAssigneeController from "@/modules/section-event-assignee/sectionEventAssignee.controller"

const router = Router()

router.put(
	"/eventId/:eventId/assignees",
	sectionEventAssigneeController.updateAssignee,
)

export default router
