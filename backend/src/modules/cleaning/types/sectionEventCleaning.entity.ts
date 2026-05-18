import UserEntity from "@/modules/user/types/user.entity"

export default interface SectionEventCleaningEntity {
	id: number
	sectionId: number
	eventType: string
	description: string
	startTime: Date
	endTime: Date
	users: UserEntity[]
}
