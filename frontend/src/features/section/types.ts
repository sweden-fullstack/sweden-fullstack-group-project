import type SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"

export type SectionCalendarEvent = Omit<
	SectionEventDto,
	"startTime" | "endTime"
> & {
	// Use date instead
	startTime: string
	// Use date instead
	endTime: string
	title: string
	visibility: "building" | "section"
}
