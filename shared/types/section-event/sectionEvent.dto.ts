type SectionEventDto = {
	id: number
	sectionId: number
	eventType: string
	startTime: Date
	endTime: Date
	description?: string
	/** Optional label; cleaning rows often omit this. */
	title?: string
	/** Everyone in the building vs this section corridor only. */
	visibility?: "building" | "section"
}

export default SectionEventDto
