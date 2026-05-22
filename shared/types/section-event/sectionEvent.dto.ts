import SectionUserDto from "../section-user/sectionUser.dto"

type SectionEventDto = {
	id: number
	title: string
	buildingId: number
	sectionId?: number
	eventTypeId: number
	startTime: Date
	endTime: Date
	description?: string

	users?: SectionUserDto[]
}

export type SectionEventVisibility = "building" | "section"

export type SectionEventCreate = Omit<SectionEventDto, "id">

export default SectionEventDto
