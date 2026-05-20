import { Router } from "express"
import announcementController from "./announcement.controller"

const router = Router()

router.get("/", announcementController.getAll)
router.get("/building/:buildingId", announcementController.getByBuildingId)
router.get("/:id", announcementController.getById)
router.post("/", announcementController.create)
router.put("/:id", announcementController.update)
router.delete("/:id", announcementController.delete)

export default router
