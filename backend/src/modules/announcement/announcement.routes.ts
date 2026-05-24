import { Router } from "express"
import announcementController from "./announcement.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.get("/", authHandler(), announcementController.getAll)
router.get(
	"/building{/:buildingId}",
	authHandler([], undefined, undefined, "params.buildingId?"),
	announcementController.getByBuildingId,
)
router.get(
	"/:id",
	authHandler(["section_admin", "admin", "landlord"]),
	announcementController.getById,
)
router.post(
	"/",
	authHandler(["section_admin", "admin", "landlord"]),
	announcementController.create,
)
router.put(
	"/:id",
	authHandler(["section_admin", "admin", "landlord"]),
	announcementController.update,
)
router.delete(
	"/:id",
	authHandler(["section_admin", "admin", "landlord"]),
	announcementController.delete,
)

export default router
