import UserRole from "@/shared/types/user-role/userRole"
import { JWT } from "@/utils/jwt"
import { NextFunction } from "express"
import { Request, Response } from "express"

/**
 * @param validRoles If empty (length 0) will skip check, if there is one or more role will try to validate that the token contains one of the roles
 * @param userId the userId to validate against
 * @param sectionId If defined will check whether user belongs to given section
 * @param buildingId If defined will check whether user belongs to given building
 */
function authHandler(
	validRoles: UserRole[] = ["student"],
	userId?: number,
	sectionId?: number,
	buildingId?: number,
) {
	return (req: Request, _res: Response, next: NextFunction) => {
		const token = req.cookies.token
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
