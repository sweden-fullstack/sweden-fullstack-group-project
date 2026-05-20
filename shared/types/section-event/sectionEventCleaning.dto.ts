import UserDto from "../user/user.dto"
import SectionEventDto from "./sectionEvent.dto"

type SectionEventCleaningDto = SectionEventDto & {
	users?: UserDto[]
}

export default SectionEventCleaningDto
