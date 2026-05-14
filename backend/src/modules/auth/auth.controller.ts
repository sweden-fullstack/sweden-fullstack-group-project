import envConfig from "@/config/env"
import passport, { Profile } from "passport"
import {
	Strategy as GoogleStrategy,
	VerifyCallback,
} from "passport-google-oauth20"
import authService from "./auth.service"
import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import { Request, Response } from "express"

class AuthController {
	passportConfigured = passport.use(
		new GoogleStrategy(
			{
				clientID: envConfig.oauthClientId,
				clientSecret: envConfig.oauthClientSecret,
				callbackURL: "/auth/callback",
			},
			this.googleStrategy,
		),
	)

	configurePassport() {
		return this.passportConfigured
	}

	async googleStrategy(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	) {
		const token = authService.googleStrategy(profile)
		return done(null, token)
	}

	async callback(req: Request, res: Response) {
		const user = req.user! as JwtPayloadExtended
		console.log(user)
		res.redirect(envConfig.frontendServer)
	}
}

export default new AuthController()
