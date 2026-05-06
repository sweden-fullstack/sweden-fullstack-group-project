import UserRole from "@/shared/types/user_roles/userRole"
import jwt from "jsonwebtoken"

export class JWT {
	private static secret =
		"4e9215ffe52a8669405206db72d8d9fae89a899f75f58c1e0e00c934c6ce028f"
	/**
	 * Defines how long tokens last, currently 90 days
	 */
	private static expirationMilliseconds = 3 * 30 * 24 * 60 * 60 * 1000

	static generate(email: string, role: UserRole) {
		return jwt.sign(
			{
				role: role,
			},
			this.secret,
			{
				expiresIn: Math.floor(
					(Date.now() + this.expirationMilliseconds) / 1000,
				),
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
		})

		console.log("Hello")
		console.log(decoded)
	}
}
