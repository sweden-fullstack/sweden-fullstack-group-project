import { Router } from "express"
import sectionEventController from "@/modules/section-event/sectionEvent.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

// TODO validate that the sectionId belongs to the building id
router.post(
	"/sectionId/:sectionId",
	authHandler(),
	sectionEventController.create,
)

// TODO add auth
router.get(
	"/sectionId/:sectionId",
	authHandler(),
	sectionEventController.getEventBySectionId,
)

// TODO add auth
router.delete("/eventId/:eventId", authHandler(), sectionEventController.delete)

export default router
