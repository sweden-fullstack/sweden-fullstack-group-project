import UserRole from "../user-role/userRole"

type SectionUserDto = {
	userId: number
	sectionId: number
	roleId: number

	// Alternative representation (still join)
	buildingId: number
	role: UserRole
	email: string
	firstName: string
	lastName: string
	roomNumber: number
	major: string
	stayPeriodStart: Date
	stayPeriodEnd: Date
	profilePictureUrl: string
}

export default SectionUserDto
