import type { SectionCalendarEvent } from "../types"

export function pickNearestSectionOnlyEvent(
	events: SectionCalendarEvent[],
	now = new Date(),
): SectionCalendarEvent | null {
	const sectionOnly = events.filter((e) => e.visibility === "section")
	if (!sectionOnly.length) return null

	const t = now.getTime()
	const upcoming = sectionOnly
		.filter((e) => new Date(e.startTime).getTime() >= t)
		.sort(
			(a, b) =>
				new Date(a.startTime).getTime() -
				new Date(b.startTime).getTime(),
		)
	if (upcoming.length) return upcoming[0]

	const past = sectionOnly
		.filter((e) => new Date(e.endTime).getTime() < t)
		.sort(
			(a, b) =>
				new Date(b.endTime).getTime() - new Date(a.endTime).getTime(),
		)
	return past[0] ?? null
}
