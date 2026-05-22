import SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"

export function eventPillColors(event: SectionEventDto) {
	if (event.sectionId) {
		return {
			bg: "#10b981",
			color: "#ffffff",
		} as const
	}
	return {
		bg: "#3b82f6",
		color: "#ffffff",
	} as const
}
