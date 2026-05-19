type SectionEventDto = {
	id: number
	buildingId: number
	sectionId?: number
	eventType: string
	startTime: Date
	endTime: Date
	title: string
	description?: string
	visibility?: SectionEventVisibility
}

export type SectionEventVisibility = "building" | "section"

export type SectionEventCreate = Omit<SectionEventDto, "id">

export default SectionEventDto
