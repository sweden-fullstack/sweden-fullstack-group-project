import { Router } from "express"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.get("/", userController.getAll)
router.get(
	"/selfAuthenticated",
	authHandler(),
	userController.getByAuthentication,
)
router.get("/:id", userController.getById)
router.post(
	"/",
	authHandler(["admin"]),
	isLandlordOfUser(),
	userController.create,
)
router.put(
	"/:id",
	authHandler(["admin"]),
	isLandlordOfUser(),
	userController.update,
)
router.delete(
	"/:id",
	authHandler(["admin"]),
	isLandlordOfUser(),
	userController.delete,
)

export default router
