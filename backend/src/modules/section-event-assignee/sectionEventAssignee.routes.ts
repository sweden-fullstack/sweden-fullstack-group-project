import { Router } from "express"
import sectionEventAssigneeController from "@/modules/section-event-assignee/sectionEventAssignee.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.put(
	"/eventId/:eventId/assignees",
	authHandler(),
	sectionEventAssigneeController.overrideAssignees,
)

export default router
