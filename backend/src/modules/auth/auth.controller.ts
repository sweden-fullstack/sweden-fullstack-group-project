import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import passport from "passport"
import { Request, Response } from "express"
import OAuthUser from "./types/user.oauth"
import envConfig from "@/config/env"

export const passportConfigured = passport.use(
	new GoogleStrategy(
		{
			clientID: envConfig.oauthClientId,
			clientSecret: envConfig.oauthClientSecret,
			callbackURL: "/auth/callback",
		},
		async (_accessToken, _refreshToken, profile, done) => {
			const user: OAuthUser = {
				googleId: profile.id,
				email: profile.emails![0].value,
				name: profile.displayName,
				firstName: profile.name?.familyName,
				lastName: profile.name?.givenName,
				picture: profile.photos?.[0].value,
			}

			return done(null, user)
		},
	),
)

class AuthController {
	async callback(req: Request, res: Response) {
		const user = req.user! as OAuthUser
		console.log(user)

		res.redirect(envConfig.frontendServer)
	}
}

export default new AuthController()
