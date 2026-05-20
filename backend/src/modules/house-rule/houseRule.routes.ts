import { Router } from "express"
import houseRuleController from "./houseRule.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.get(
	"/by_building",
	authHandler(),
	houseRuleController.getAllByBuildingId,
)
router.post("/", authHandler(["admin", "landlord"]), houseRuleController.create)
router.put(
	"/:id",
	authHandler(["admin", "landlord"]),
	houseRuleController.update,
)
router.delete(
	"/:id",
	authHandler(["admin", "landlord"]),
	houseRuleController.delete,
)

export default router
