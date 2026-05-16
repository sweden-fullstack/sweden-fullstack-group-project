import { Router } from "express"
import authHandler from "@/middlewares/authHandler"
import sectionUserController from "./sectionUser.controller"
import canAssignToSection from "./middlewares/canAssignToSection"

const router = Router()

router.get(
	"/building/:buildingId",
	authHandler(),
	sectionUserController.getByBuildingId,
)

router.get(
	"/section/:sectionId",
	authHandler(),
	sectionUserController.getBySectionId,
)

router.get(
	"/selfAuthenticated",
	authHandler(),
	sectionUserController.getByAuthentication,
)

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
