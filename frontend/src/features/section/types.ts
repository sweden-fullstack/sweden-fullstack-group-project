import type SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"

// TODO just use SectionEventDto
export type SectionCalendarEvent = Omit<
	SectionEventDto,
	"startTime" | "endTime"
> & {
	// Use date instead
	startTime: string
	// Use date instead
	endTime: string
	title: string
	visibility: "building" | "section" // TODO if sectionId defined
}
