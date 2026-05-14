import jwt from "jsonwebtoken"
import UserRole from "../user-role/userRole"

interface JwtPayloadExtended extends jwt.JwtPayload {
	userId: number
	exp: number
	buildingId: number
	sectionId: number
	userRole: UserRole
}

export default JwtPayloadExtended
