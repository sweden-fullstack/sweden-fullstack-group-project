import SectionEventDto from "../section-event/sectionEvent.dto"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"

type SectionEventAssigneeDto = SectionEventDto & {
	users?: SectionUserDto[]
}

export default SectionEventAssigneeDto
