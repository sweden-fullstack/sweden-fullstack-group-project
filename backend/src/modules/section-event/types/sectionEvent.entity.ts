import SectionUserEntity from "@/modules/section-user/types/sectionUser.entity"

type SectionEventEntity = {
	id: number
	title: string
	building_id: number
	section_id: number
	event_type_id: number
	description?: string
	start_time: Date
	end_time: Date

	// mapped joins
	users?: SectionUserEntity[]
}

export default SectionEventEntity
