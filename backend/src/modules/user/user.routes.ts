import { Router } from "express"
import userController from "./user.controller"
import authHandler from "@/middlewares/authHandler"

const userRouter = Router()

userRouter.get("/", authHandler(["admin"]), userController.getAll)
userRouter.get(
	"/selfAuthenticated",
	authHandler(),
	userController.getByAuthentication,
)
userRouter.put("/:id", authHandler(), userController.update)

export default userRouter
