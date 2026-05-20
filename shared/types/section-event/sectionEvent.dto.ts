type SectionEventDto = {
	id: number
	title: string
	buidingId: number
	sectionId?: number
	eventTypeId: number
	startTime: Date
	endTime: Date
	description?: string
}

export default SectionEventDto
