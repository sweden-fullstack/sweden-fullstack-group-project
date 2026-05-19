import envConfig from "@/config/env"
import passport, { Profile } from "passport"
import {
	Strategy as GoogleStrategy,
	VerifyCallback,
} from "passport-google-oauth20"
import { Request, Response } from "express"
import { JWT } from "@/utils/jwt"
import UserRole from "@/shared/types/user-role/userRole"
import OAuthUser from "./types/user.oauth"
import userService from "../user/user.service"

class AuthController {
	passportConfigured = passport.use(
		new GoogleStrategy(
			{
				clientID: envConfig.oauthClientId,
				clientSecret: envConfig.oauthClientSecret,
				callbackURL: "/auth/callback", // sometimes I wonder what kind of drugs google developers were on when developing oauth, if this is removed everything breaks
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
		const oauthUser: OAuthUser = {
			googleId: profile.id,
			email: profile.emails![0].value,
			name: profile.displayName,
			firstName: profile.name?.familyName,
			lastName: profile.name?.givenName,
			picture: profile.photos?.[0].value,
		}

		return done(null, oauthUser)
	}

	async callback(req: Request, res: Response) {
		const oauthUser = req.user! as OAuthUser

		try {
			const user = await userService.getByEmail(oauthUser.email)

			const token = JWT.generate(
				user.role! as UserRole,
				user.id,
				user.sectionId!,
				user.buildingId!,
			)

			res.cookie("token", token, {
				domain: "localhost",
				httpOnly: false, // Should be changed if this becomes real app, but easier to debug like this
				secure: false,
				sameSite: "lax",
			})

			res.redirect(envConfig.oauthSuccessRedirect)
		} catch {
			res.cookie("oauthUser", JSON.stringify(oauthUser), {
				domain: "localhost",
				httpOnly: false,
				secure: false,
				sameSite: "lax",
			})

			res.redirect(envConfig.oauthFailureRedirect)
		}
	}
}

export default new AuthController()
