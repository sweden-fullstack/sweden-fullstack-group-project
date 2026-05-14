import UserRole from "@/shared/types/user-role/userRole"
import { JWT } from "@/utils/jtw"
import { NextFunction } from "express"
import { Request, Response } from "express"

export default class AuthHandler {
	/**
	 * @param validRoles If empty (length 0) will skip check, if there is one or more role will try to validate that the token contains one of the roles
	 * @param userId the userId to validate against
	 * @param sectionId If defined will check whether user belongs to given section
	 * @param buildingId If defined will check whether user belongs to given building
	 */
	static handle(
		validRoles: UserRole[] = ["student"],
		userId?: number,
		sectionId?: number,
		buildingId?: number,
	) {
		return (req: Request, _res: Response, next: NextFunction) => {
			const token = req.headers["authorization"] as string
			const bearerToken = token.replace("Bearer ", "")
			const decoded = JWT.verify(
				bearerToken,
				validRoles,
				userId,
				sectionId,
				buildingId,
			)

			req.user = decoded
			next()
		}
	}
}
