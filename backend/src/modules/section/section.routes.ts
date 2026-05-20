import { Router } from "express"
import sectionController from "@/modules/section/section.controller"

const router = Router()

router.get("/", sectionController.getAll)
router.get("/:id", sectionController.getById)
router.post("/", sectionController.create)
router.put("/:id", sectionController.update)
router.delete("/:id", sectionController.delete)

export default router
