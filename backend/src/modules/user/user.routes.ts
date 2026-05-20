import { Router } from "express"
import userController from "./user.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.get("/", authHandler(["admin"]), userController.getAll)
router.put("/:id", authHandler([]), userController.update)

export default router
