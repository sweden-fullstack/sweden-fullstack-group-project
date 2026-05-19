import UnauthenticatedError from "@/errors/UnauthenticatedError"
import UserRole from "@/shared/types/user-role/userRole"
import { JWT } from "@/utils/jwt"
import { NextFunction } from "express"
import { Request, Response } from "express"

/**
 * @param validRoles If empty (length 0) will skip check, if there is one or more role will try to validate that the token contains one of the roles, default empty
 * @param userId the userId to validate against
 * @param sectionId If defined will check whether user belongs to given section
 * @param buildingId If defined will check whether user belongs to given building
 */
function authHandler(
	validRoles: UserRole[] = [],
	userId?: number,
	sectionId?: number,
	buildingId?: number,
) {
	return (req: Request, _res: Response, next: NextFunction) => {
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
			userId,
			sectionId,
			buildingId,
		)

		req.user = decoded
		next()
	}
}

export default authHandler
