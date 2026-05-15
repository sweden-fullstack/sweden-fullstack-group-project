import passport from "passport"
import { Router } from "express"
import authController from "./auth.controller"

const router = Router()

authController.configurePassport()

router.get(
	"/",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		prompt: "select_account",
		session: false,
	}),
)

router.get(
	"/callback",
	passport.authenticate("google", { session: false }),
	authController.callback,
)

export default router
