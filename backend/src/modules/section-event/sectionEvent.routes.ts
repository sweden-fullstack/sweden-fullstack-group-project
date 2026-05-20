import { Router } from "express"
import sectionEventController from "@/modules/section-event/sectionEvent.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.get(
	"/section_id/:sectionId",
	authHandler([], undefined, "param.sectionId"),
	sectionEventController.getAllBySectionId,
)

router.post(
	"/section_id/:sectionId",
	authHandler([], undefined, "param.sectionId"),
	sectionEventController.create,
)

// TODO add auth
router.delete("/eventId/:eventId", authHandler(), sectionEventController.delete)

export default router
