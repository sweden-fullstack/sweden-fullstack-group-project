import TokenPayload from "@/shared/types/jwt/tokenPayload"
import UserRole from "@/shared/types/user_roles/userRole"
import jwt from "jsonwebtoken"

export class JWT {
	private static secret =
		"4e9215ffe52a8669405206db72d8d9fae89a899f75f58c1e0e00c934c6ce028f"

	/**
	 * Defines how long tokens last, currently 90 days
	 */
	private static expirationSeconds = 3 * 30 * 24 * 60 * 60

	static generate(email: string, role: UserRole) {
		return jwt.sign(
			{
				role: role,
			},
			this.secret,
			{
				expiresIn: this.expirationSeconds,
				subject: email,
			},
		)
	}

	/**
	 * @param token the input token
	 * @param email the email to validate against
	 * @param validRoles if the role in the token doesn't match any of the roles here it will fail
	 */
	static verify(
		token: string,
		email: string,
		validRoles: UserRole[] = ["student"],
	) {
		const decoded = jwt.verify(token, this.secret, {
			subject: email,
		}) as TokenPayload

		if (decoded.sub !== email) {
			throw new jwt.JsonWebTokenError("Subject doesn't match")
		}

		if (!(validRoles as string[]).includes(decoded.role)) {
			throw new jwt.JsonWebTokenError("User Role missing")
		}

		if (Math.floor(Date.now() / 1000) > decoded.exp) {
			throw new jwt.JsonWebTokenError("Token expired")
		}
	}
}
