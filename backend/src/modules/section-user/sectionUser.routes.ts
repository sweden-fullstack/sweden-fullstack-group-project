import { Router } from "express"
import authHandler from "@/middlewares/authHandler"
import sectionUserController from "./sectionUser.controller"
import canAssignToSection from "./middlewares/canAssignToSection"

const router = Router()

router.post(
	"/userToSection/sectionId/:sectionId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.create,
)

router.put(
	"/userToSection/sectionId/:sectionId/userId/:userId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.create,
)

router.delete(
	"/userToSection/sectionId/:sectionId/userId/:userId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
)

export default router
