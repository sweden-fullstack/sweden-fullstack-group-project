import UserRole from "../user-role/userRole"

type SectionUserUpdate = {
	sectionId: number

	// Alternative representation (still join)
	/**
	 * If landlord only student and section_admin is permitted, otherwise throw error
	 */
	role: UserRole

	// From joins
	roomNumber: number
	stayPeriodStart: Date
	stayPeriodEnd: Date
}

export default SectionUserUpdate
