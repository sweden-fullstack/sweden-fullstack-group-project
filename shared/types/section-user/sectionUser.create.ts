import UserRole from "../user-role/userRole"

type SectionUserCreate = {
	// From joins
	/**
	 * If landlord only student and section_admin is permitted, otherwise throw error
	 */
	role: UserRole
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
