import { toDateKey } from "@/utils/date"
import type { SectionCalendarEvent } from "../types"

export function indexEventsByDay(
	events: SectionCalendarEvent[],
): Map<string, SectionCalendarEvent[]> {
	const map = new Map<string, SectionCalendarEvent[]>()

	for (const ev of events) {
		const start = new Date(ev.startTime)
		const end = new Date(ev.endTime)
		const cursor = new Date(start)
		cursor.setHours(0, 0, 0, 0)
		const last = new Date(end)
		last.setHours(0, 0, 0, 0)

		while (cursor.getTime() <= last.getTime()) {
			const key = toDateKey(cursor)
			const list = map.get(key)
			if (list) list.push(ev)
			else map.set(key, [ev])
			cursor.setDate(cursor.getDate() + 1)
		}
	}

	for (const list of map.values()) {
		list.sort(
			(a, b) =>
				new Date(a.startTime).getTime() -
				new Date(b.startTime).getTime(),
		)
	}

	return map
}
