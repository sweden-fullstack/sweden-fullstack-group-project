import SectionUserDto from "../section-user/sectionUser.dto"

type SectionEventDto = {
	id: number
	title: string
	buidingId: number
	sectionId?: number
	eventTypeId: number
	startTime: Date
	endTime: Date
	description?: string

	users?: SectionUserDto[]
}

export default SectionEventDto
