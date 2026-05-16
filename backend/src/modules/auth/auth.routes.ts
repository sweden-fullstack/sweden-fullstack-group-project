import passport from "passport"
import { Router } from "express"
import authController from "./auth.controller"

const authRouter = Router()

authController.configurePassport()

authRouter.get(
	"/",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		prompt: "select_account",
		session: false,
	}),
)

authRouter.get(
	"/callback",
	passport.authenticate("google", { session: false }),
	authController.callback,
)

export default authRouter
