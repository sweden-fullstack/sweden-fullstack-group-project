import { Router } from "express"
import cleaningController from "./cleaning.controller"

const router = Router()

router.get("/:sectionId", cleaningController.getBySection)
router.post("/", cleaningController.create)
router.put("/:sectionEventId/assignees", cleaningController.update)
router.delete("/:eventId", cleaningController.delete)

export default router
