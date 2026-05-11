import jwt from "jsonwebtoken"
import UserRole from "../user-roles/userRole"

interface JwtPayloadExtended extends jwt.JwtPayload {
	userId: number
	exp: number
	sectionId: number
	userRole: UserRole
}

export default JwtPayloadExtended
