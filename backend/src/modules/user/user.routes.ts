import { Router } from "express"
import userController from "./user.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.get("/", authHandler(["admin"]), userController.getAll)
router.get(
	"/selfAuthenticated",
	authHandler(),
	userController.getByAuthentication,
)
router.put("/:id", authHandler(["admin"]), userController.update)

export default router
