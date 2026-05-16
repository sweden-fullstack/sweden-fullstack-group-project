import UserRole from "../user-role/userRole"

type SectionUserCreate = {
	// Alternative representation (still join)
	/**
	 * If landlord only student and section_admin is permitted, otherwise throw error
	 */
	role: UserRole

	// From joins
	email: string
	firstName: string
	lastName: string
	roomNumber: number
	major: string
	stayPeriodStart: Date
	stayPeriodEnd: Date
	profilePictureUrl?: string
}

export default SectionUserCreate
