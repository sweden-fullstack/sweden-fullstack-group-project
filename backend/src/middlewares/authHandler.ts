import TokenPayload from "@/shared/types/jwt/tokenPayload"
import UserRole from "@/shared/types/user-roles/userRole"
import { JWT } from "@/utils/jtw"
import { NextFunction } from "express"
import jwt from "jsonwebtoken"
import { Request } from "express"

export default class AuthHandler {
	static hello() {}

	static handle(
		req: Request,
		next: NextFunction,
		validRoles: UserRole[] = ["student"],
		sectionId?: number,
	) {
		const token = req.headers["authorization"] as string
		const decoded = jwt.decode(token) as TokenPayload
		JWT.verify(token, parseInt(decoded.sub), sectionId, validRoles)

		req.user = decoded
		next()
	}
}
