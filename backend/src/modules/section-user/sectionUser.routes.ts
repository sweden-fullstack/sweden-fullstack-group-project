import { Router } from "express"
import authHandler from "@/middlewares/authHandler"
import sectionUserController from "./sectionUser.controller"
import canAssignToSection from "./middlewares/canAssignToSection"

const router = Router()

router.post(
	"/userToSection",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.create,
)

router.post(
	"/userToSection/:userId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.create,
)

export default router
