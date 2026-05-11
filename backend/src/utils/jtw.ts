import envConfig from "@/config/env"
import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import UserRole from "@/shared/types/user-roles/userRole"
import jwt from "jsonwebtoken"

export class JWT {
	private static secret = envConfig.jwtSecret

	/**
	 * Defines how long tokens last, currently 90 days
	 */
	private static expirationSeconds = 3 * 30 * 24 * 60 * 60

	/**
	 * Generates JWT token
	 */
	static generate(userId: number, userRole: UserRole, sectionId: number) {
		return jwt.sign(
			{
				sectionId: sectionId,
				userRole: userRole,
				userId: userId,
			},
			this.secret,
			{
				expiresIn: this.expirationSeconds,
			},
		)
	}

	/**
	 * @param token the input token
	 * @param userId the userId to validate against
	 * @param sectionId If defined will check whether user belongs to given section
	 * @param validRoles if the role in the token doesn't match any of the roles here it will fail
	 */
	static async verify(
		token: string,
		userId: number,
		validRoles: UserRole[] = ["student"],
		sectionId?: number,
	) {
		const decoded = jwt.verify(token, this.secret, {
			subject: `${userId}`,
		}) as JwtPayloadExtended

		if (decoded.userId !== userId) {
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
