import UserRole from "@/shared/types/user-role/userRole"

type SectionUserEntity = {
	user_id: number
	section_id: number
	role_id: number
	role?: UserRole
}

export default SectionUserEntity
