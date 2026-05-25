type SectionEventEntity = {
	id: number
	title: string
	building_id: number
	section_id?: number | null
	event_type_id: number
	description?: string
	start_time: Date
	end_time: Date
}

export default SectionEventEntity
