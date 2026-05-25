import { Router } from "express"
import sectionEventController from "@/modules/section-event/sectionEvent.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.get(
	"/building_id{/:buildingId}",
	authHandler([], undefined, undefined, "params.buildingId?"),
	sectionEventController.getAllByBuildingId,
)

router.get(
	"/section_id{/:sectionId}",
	authHandler([], undefined, "params.sectionId?"),
	sectionEventController.getAllBySectionId,
)

router.post(
	"/section_id{/:sectionId}",
	authHandler([], undefined, "params.sectionId?"),
	sectionEventController.create,
)

router.put(
	"/:id",
	authHandler([], undefined, "body.sectionId?"),
	sectionEventController.update,
)

router.delete("/:id", authHandler(), sectionEventController.delete)

export default router
