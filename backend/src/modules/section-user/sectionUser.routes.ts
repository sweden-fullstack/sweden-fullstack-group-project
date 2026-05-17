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
	"/self_authenticated",
	authHandler(),
	sectionUserController.getByAuthentication,
)

sectionUserRouter.post(
	"/user_to_section/section_id/:sectionId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.create,
)

sectionUserRouter.put(
	"/user_to_section/section_id/:sectionId/user_id/:userId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.update,
)

sectionUserRouter.delete(
	"/user_to_section/section_id/:sectionId/user_id/:userId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.delete,
)

export default sectionUserRouter
