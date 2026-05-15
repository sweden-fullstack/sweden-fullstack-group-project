type SectionEventDto = {
	id: number
	buildingId: number
	sectionId?: number
	eventType: string
	startTime: Date
	endTime: Date
	title: string
	description?: string
	/** TODO Everyone in the building vs this section corridor only. */
	visibility?: "building" | "section"
}

export default SectionEventDto
