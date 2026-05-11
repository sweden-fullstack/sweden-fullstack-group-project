import jwt from "jsonwebtoken"
import UserRole from "../user-roles/userRole"

interface TokenPayload extends jwt.JwtPayload {
	sub: string
	exp: number
	sectionId: number
	userRole: UserRole
}

export default TokenPayload
