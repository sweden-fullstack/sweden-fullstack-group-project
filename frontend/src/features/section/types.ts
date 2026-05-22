import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"
import SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"
import SectionEventUpdate from "@/shared/types/section-event/sectionEvent.update"

type EventDraft = {
	id?: number // If defined editing otherwise creating
	dto: SectionEventDto | SectionEventCreate | SectionEventUpdate
}

export default EventDraft
