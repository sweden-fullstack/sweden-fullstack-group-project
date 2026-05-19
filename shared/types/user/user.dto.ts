import UserRole from "../user-role/userRole"

type UserDto = {
	id: number
	email: string
	firstName: string
	lastName: string
	roomNumber: number
	major: string
	stayPeriodStart: Date
	stayPeriodEnd: Date
	profilePictureUrl?: string

	// From joins
	role?: UserRole
	roleId?: number
	sectionId?: number
	buildingId?: number
}

export default UserDto
