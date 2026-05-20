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
	"/self_authenticated",
	authHandler(),
	sectionUserController.getByAuthentication,
)

router.post(
	"/user_to_section/section_id/:sectionId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.create,
)

router.put(
	"/user_to_section/section_id/:sectionId/user_id/:userId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.update,
)

router.delete(
	"/user_to_section/section_id/:sectionId/user_id/:userId",
	authHandler(["admin", "landlord"]),
	canAssignToSection(),
	sectionUserController.delete,
)

export default router
