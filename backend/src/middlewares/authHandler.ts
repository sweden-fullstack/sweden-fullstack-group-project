import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import UserRole from "@/shared/types/user-roles/userRole"
import { JWT } from "@/utils/jtw"
import { NextFunction } from "express"
import jwt from "jsonwebtoken"
import { Request } from "express"

export default class AuthHandler {
	static handle(
		req: Request,
		next: NextFunction,
		validRoles: UserRole[] = ["student"],
		sectionId?: number,
	) {
		const token = req.headers["authorization"] as string
		const decoded = jwt.decode(token) as JwtPayloadExtended
		JWT.verify(token, decoded.userId, validRoles, sectionId)

		req.user = decoded
		next()
	}
}
