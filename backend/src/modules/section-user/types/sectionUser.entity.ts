import UserRole from "@/shared/types/user-role/userRole"

type SectionUserEntity = {
	user_id: number
	section_id: number
	role_id: number

	// From joins
	role?: UserRole
	email?: string
	first_name?: string
	last_name?: string
	room_number?: number
	major?: string
	stay_period_start?: Date
	stay_period_end?: Date
	profile_picture_url?: string
}

export default SectionUserEntity
