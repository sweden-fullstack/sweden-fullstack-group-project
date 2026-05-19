import type { SectionCalendarEvent } from "../../types"

export function eventPillColors(event: SectionCalendarEvent) {
	if (event.visibility === "building") {
		return {
			bg: "#3b82f6",
			color: "#ffffff",
		} as const
	}
	return {
		bg: "#10b981",
		color: "#ffffff",
	} as const
}
