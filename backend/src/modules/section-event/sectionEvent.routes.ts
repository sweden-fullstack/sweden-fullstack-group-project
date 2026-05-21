import { Router } from "express"
import sectionEventController from "@/modules/section-event/sectionEvent.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.get(
	"/section_id/:sectionId",
	authHandler([], undefined, "params.sectionId"),
	sectionEventController.getAllBySectionId,
)

router.post(
	"/section_id{/:sectionId}",
	authHandler([], undefined, "params.sectionId?"),
	sectionEventController.create,
)

router.delete("/:id", authHandler(), sectionEventController.delete)

export default router
