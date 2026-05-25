import SectionEventDto from "../section-event/sectionEvent.dto"

type SectionDto = {
	id: number
	buildingId: number
	name: string
	description?: string

	// From joins
	buildingName: string

	// must be mapped manually
	events?: SectionEventDto[]
}

export default SectionDto
