import envConfig from "@/config/env"
import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import UserRole from "@/shared/types/user-role/userRole"
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
	static generate(
		userRole: UserRole,
		userId: number,
		sectionId: number,
		buildingId: number,
	) {
		return jwt.sign(
			{
				userRole: userRole,
				userId: userId,
				sectionId: sectionId,
				buildingId: buildingId,
			},
			this.secret,
			{
				expiresIn: this.expirationSeconds,
			},
		)
	}

	/**
	 * @param token the input token
	 * @param validRoles If empty (length 0) will skip check, if there is one or more role will try to validate that the token contains one of the roles
	 * @param userId the userId to validate against
	 * @param sectionId If defined will check whether user belongs to given section
	 * @param buildingId If defined will check whether user belongs to given building
	 * @returns decoded token
	 */
	static verify(
		token: string,
		validRoles: UserRole[] = ["student"],
		userId?: number,
		sectionId?: number,
		buildingId?: number,
	) {
		const decoded = jwt.verify(token, this.secret) as JwtPayloadExtended

		if (Math.floor(Date.now() / 1000) > decoded.exp) {
			throw new jwt.TokenExpiredError(
				"Token expired",
				new Date(decoded.exp),
			)
		}

		if (decoded.userRole === "admin") {
			return decoded
		}

		if (validRoles.length > 0 && !validRoles.includes(decoded.userRole)) {
			throw new jwt.JsonWebTokenError("User role missing")
		}

		if (userId && decoded.userId !== userId) {
			throw new jwt.JsonWebTokenError("Subject doesn't match")
		}

		if (sectionId && decoded.sectionId !== sectionId) {
			throw new jwt.JsonWebTokenError("Section id doesn't match")
		}

		if (buildingId && decoded.buildingId !== buildingId) {
			throw new jwt.JsonWebTokenError("Building id doesn't match")
		}

		return decoded
	}
}
