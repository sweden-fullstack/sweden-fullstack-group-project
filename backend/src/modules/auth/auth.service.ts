import { Profile } from "passport"
import userService from "../user/user.service"
import OAuthUser from "./types/user.oauth"

class AuthService {
	async googleStrategy(profile: Profile) {
		const oauthUser: OAuthUser = {
			googleId: profile.id,
			email: profile.emails![0].value,
			name: profile.displayName,
			firstName: profile.name?.familyName,
			lastName: profile.name?.givenName,
			picture: profile.photos?.[0].value,
		}

		const user = await userService.getByEmail(oauthUser.email)
		return user
	}
}

export default new AuthService()
