import { Router } from "express"
import userController from "./user.controller"

const router = Router()

router.get("/", userController.getAll)
router.get("/:username", userController.getByUsername)
router.post("/", userController.create)
router.put("/:username", userController.update)
router.delete("/:username", userController.delete)

export default router
