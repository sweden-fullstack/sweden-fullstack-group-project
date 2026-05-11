import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import UserRole from "@/shared/types/user-roles/userRole"
import { JWT } from "@/utils/jtw"
import { NextFunction } from "express"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

export default class AuthHandler {
	static handle(validRoles: UserRole[] = ["student"], sectionId?: number) {
		return (req: Request, _res: Response, next: NextFunction) => {
			const token = req.headers["authorization"] as string
			const decoded = jwt.decode(token) as JwtPayloadExtended
			JWT.verify(token, decoded.userId, validRoles, sectionId)

			req.user = decoded
			next()
		}
	}
}
