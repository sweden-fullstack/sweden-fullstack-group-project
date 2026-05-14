import { Router } from "express"
import userController from "./user.controller"
import AuthHandler from "@/middlewares/authHandler"

const router = Router()

router.get("/", userController.getAll)
router.get(
	"/selfAuthenticated",
	AuthHandler.handle(),
	userController.getByAuthentication,
)
router.get("/:id", userController.getById)
router.post("/", userController.create)
router.put("/:id", userController.update)
router.delete("/:id", userController.delete)

export default router
