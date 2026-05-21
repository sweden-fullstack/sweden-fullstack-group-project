import ServerError from "@/errors/ServerError"
import UnauthenticatedError from "@/errors/UnauthenticatedError"
import UserRole from "@/shared/types/user-role/userRole"
import { JWT } from "@/utils/jwt"
import { NextFunction } from "express"
import { Request, Response } from "express"

/**
 * @param validRoles If empty (length 0) will skip check, if there is one or more role will try to validate that the token contains one of the roles, default empty
 * @param userId the userId to validate against, if string tries to access from param
 * @param sectionId If defined will check whether user belongs to given section, if string tries to access from param
 * @param buildingId If defined will check whether user belongs to given building, if string tries to access from param
 */
function authHandler(
	validRoles: UserRole[] = [],
	userId?: number | string,
	sectionId?: number | string,
	buildingId?: number | string,
) {
	return (req: Request, _res: Response, next: NextFunction) => {
		function mapValue(value?: number | string) {
			if (typeof value === "string") {
				const parts = value.split(".")

				if (!parts[0] || !parts[1]) {
					throw new ServerError()
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const reqAny = req as any

				let secondString = ""
				if (parts[1].endsWith("?")) {
					secondString = parts[1].slice(0, -1)
				} else {
					secondString = parts[1]
				}

				const result = reqAny[parts[0]]?.[secondString] ?? undefined

				return parseInt(result)
			}
			return value
		}

		let token: string | undefined

		if (req.cookies?.token) {
			token = req.cookies.token
		} else if (req.headers.authorization?.startsWith("Bearer ")) {
			token = req.headers.authorization.split(" ")[1]
		}

		if (!token) {
			throw new UnauthenticatedError("No token provided")
		}

		const decoded = JWT.verify(
			token,
			validRoles,
			mapValue(userId),
			mapValue(sectionId),
			mapValue(buildingId),
		)

		req.user = decoded
		next()
	}
}

export default authHandler
