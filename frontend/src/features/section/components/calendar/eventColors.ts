import type { SectionCalendarEvent } from "../../types"

export function eventPillColors(event: SectionCalendarEvent) {
	if (event.visibility === "building") {
		return {
			bg: "#1d4ed8",
			color: "#f8fafc",
			boxShadow: "inset 4px 0 0 0 #93c5fd",
		} as const
	}
	return {
		bg: "#047857",
		color: "#ecfdf5",
		boxShadow: "inset 4px 0 0 0 #6ee7b7",
	} as const
}
