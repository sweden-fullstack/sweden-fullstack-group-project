import { Router } from "express"
import sectionController from "@/modules/section/section.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

// router.get("/", authHandler(), sectionController.getAll) Depricated
router.get("/{:id}", authHandler(), sectionController.getById)
router.post("/", authHandler(), sectionController.create)
router.put("/:id", authHandler(), sectionController.update)
router.delete("/:id", authHandler(), sectionController.delete)

export default router
