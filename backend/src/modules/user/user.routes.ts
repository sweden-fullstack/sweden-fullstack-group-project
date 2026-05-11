import { Router } from "express"
import userController from "./user.controller"
import AuthHandler from "@/middlewares/authHandler"
import { getAllUserRoles } from "@/shared/types/user-roles/userRole"

const router = Router()

router.get("/", userController.getAll)
router.get("/:id", userController.getById)
router.get(
	"/selfAuthenticated",
	AuthHandler.handle(getAllUserRoles),
	userController.getByAuthentication,
)
router.post("/", userController.create)
router.put("/:id", userController.update)
router.delete("/:id", userController.delete)

export default router
