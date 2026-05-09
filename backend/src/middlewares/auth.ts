import TokenPayload from "@/shared/types/jwt/tokenPayload"
import UserRole from "@/shared/types/user-roles/userRole"
import { JWT } from "@/utils/jtw"
import { NextFunction } from "express"
import jwt from "jsonwebtoken"

export default class AuthHandler {
	static handle(
		req: Request,
		next: NextFunction,
		sectionId: number,
		validRoles: UserRole[] = ["student"],
	) {
		const token = req.headers.get("authorization") as string
		const decoded = jwt.decode(token) as TokenPayload

		JWT.verify(token, decoded.sub, sectionId, validRoles)

		req["user"] = decoded

		next()
	}
}
