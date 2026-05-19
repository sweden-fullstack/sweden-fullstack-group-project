import { Router } from "express"
import sectionEventController from "@/modules/section-event/sectionEvent.controller"

const router = Router()

router.post("/sectionId/:sectionId", sectionEventController.create)

router.get("/sectionId/:sectionId", sectionEventController.getEventBySectionId)

router.delete("/eventId/:eventId", sectionEventController.delete)

export default router
