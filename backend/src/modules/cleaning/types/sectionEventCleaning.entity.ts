export default interface SectionEventCleaningEntity {
	id: number
	sectionId: number
	eventType: string
	description: string
	startTime: Date
	endTime: Date
	users: Array<{
		id: number
		email: string
		firstName: string
		lastName: string
		sectionId: number
	}>
}
