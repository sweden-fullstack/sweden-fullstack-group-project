import SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"

export function pickNearestSectionOnlyEvent(
	events: SectionEventDto[],
	now = new Date(),
): SectionEventDto | null {
	const sectionOnly = events.filter((e) => e.sectionId)
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
