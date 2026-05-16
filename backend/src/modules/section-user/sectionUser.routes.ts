import { Router } from "express"
import authHandler from "@/middlewares/authHandler"
import sectionUserController from "./sectionUser.controller"
import canAssignToSection from "./middlewares/canAssignToSection"

const sectionUserRouter = Router()

sectionUserRouter.get(
	"/building/:buildingId",
	authHandler(),
	sectionUserController.getByBuildingId,
)

sectionUserRouter.get(
	"/section/:sectionId",
	authHandler(),
	sectionUserController.getBySectionId,
)

sectionUserRouter.get(
	"/selfAuthenticated",
	authHandler(),
	sectionUserController.getByAuthentication,
)

sectionUserRouter.post(
	"/userToSection/sectionId/:sectionId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.create,
)

sectionUserRouter.put(
	"/userToSection/sectionId/:sectionId/userId/:userId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.create,
)

sectionUserRouter.delete(
	"/userToSection/sectionId/:sectionId/userId/:userId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
)

export default sectionUserRouter
