import { Router } from "express"
import sectionEventAssigneeController from "@/modules/section-event-assignee/sectionEventAssignee.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.put(
	"/event_id/:eventId/assignees",
	authHandler(),
	sectionEventAssigneeController.overrideAssignees,
)

export default router
