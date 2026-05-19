import type SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"
import type {
	SectionEventCreate,
	SectionEventVisibility,
} from "@/shared/types/section-event/sectionEvent.dto"

export type { SectionEventCreate, SectionEventVisibility }

export type SectionCalendarEvent = SectionEventDto

export type SectionEventDraft = SectionEventCreate
