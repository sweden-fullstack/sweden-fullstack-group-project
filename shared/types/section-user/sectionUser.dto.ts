import UserRole from "../user-role/userRole"

type SectionUserDto = {
	userId: number
	sectionId: number
	roleId: number

	// Alternative representation (still join)
	role?: UserRole
	email?: string
	firstName?: string
	lastName?: string
	roomNumber?: number
	major?: string
	stayPeriodStart?: Date
	stayPeriodEnd?: Date
	profilePictureUrl?: string
}

export default SectionUserDto
