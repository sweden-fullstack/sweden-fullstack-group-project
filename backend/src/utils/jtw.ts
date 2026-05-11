import envConfig from "@/config/env"
import TokenPayload from "@/shared/types/jwt/tokenPayload"
import UserRole from "@/shared/types/user-roles/userRole"
import jwt from "jsonwebtoken"

export class JWT {
	private static secret = envConfig.jwtSecret

	/**
	 * Defines how long tokens last, currently 90 days
	 */
	private static expirationSeconds = 3 * 30 * 24 * 60 * 60
	static generate(userId: number, sectionId: number, userRole: UserRole) {
		return jwt.sign(
			{
				sectionId: sectionId,
				userRole: userRole,
			},
			this.secret,
			{
				subject: `${userId}`,
				expiresIn: this.expirationSeconds,
			},
		)
	}

	/**
	 * @param token the input token
	 * @param userId the email to validate against
	 * @param validRoles if the role in the token doesn't match any of the roles here it will fail
	 */
	static async verify(
		token: string,
		userId: number,
		sectionId?: number,
		validRoles: UserRole[] = ["student"],
	) {
		const decoded = jwt.verify(token, this.secret, {
			subject: `${userId}`,
		}) as TokenPayload

		if (parseInt(decoded.sub) !== userId) {
			throw new jwt.JsonWebTokenError("Subject doesn't match")
		}

		if (sectionId && decoded.sectionId !== sectionId) {
			throw new jwt.JsonWebTokenError("Section id doesn't match")
		}

		if (!validRoles.includes(decoded.userRole)) {
			throw new jwt.JsonWebTokenError("User Role missing")
		}

		if (Math.floor(Date.now() / 1000) > decoded.exp) {
			throw new jwt.TokenExpiredError(
				"Token expired",
				new Date(decoded.exp),
			)
		}
	}
}
