import UserRole from "../user-role/userRole"

type SectionUserUpdate = {
	// From joins
	/**
	 * If landlord only student and section_admin is permitted, otherwise throw error
	 */
	role: UserRole
	roomNumber: number
	stayPeriodStart: Date
	stayPeriodEnd: Date
}

export default SectionUserUpdate
