import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"
import SectionEventUpdate from "@/shared/types/section-event/sectionEvent.update"

type EventDraft = {
	id?: number // If defined editing otherwise creating
	dto: SectionEventCreate | SectionEventUpdate
}

export default EventDraft
