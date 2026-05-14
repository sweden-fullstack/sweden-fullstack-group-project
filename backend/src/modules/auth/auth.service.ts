import UserRole from "@/shared/types/user-role/userRole"
import { JWT } from "@/utils/jtw"
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
		const token = JWT.generate(
			user.role! as UserRole,
			user.id,
			user.sectionId!,
			user.buildingId!,
		)

		console.log("GENERATED TOKEN below")
		console.log(token)

		return JWT.verify(token)
	}
}

export default new AuthService()
