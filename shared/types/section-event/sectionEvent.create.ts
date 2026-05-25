type SectionEventCreate = {
	title: string
	eventTypeId: number
	sectionId?: number
	startTime: Date
	endTime: Date
	description?: string
}

export default SectionEventCreate
