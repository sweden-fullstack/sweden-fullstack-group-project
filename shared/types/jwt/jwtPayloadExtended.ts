import jwt from "jsonwebtoken"
import UserRole from "../user-role/userRole"

/**
 * This shouldn't be used in the frontend since we use tokens and is here just to show the structure
 */
interface JwtPayloadExtended extends jwt.JwtPayload {
	userId: number
	exp: number
	buildingId: number
	sectionId: number
	userRole: UserRole
}

export default JwtPayloadExtended
