import { useCallback, useEffect, useState } from "react"
import type { SectionCalendarEvent } from "../types"

// TODO maybe use zustand store? and convert upsert to update and create
export function useSectionCalendarEvents(
	sectionId: number | null,
	seed: SectionCalendarEvent[],
) {
	const [events, setEvents] = useState<SectionCalendarEvent[]>([])
	const [ready, setReady] = useState(false)

	useEffect(() => {
		if (sectionId == null) {
			setReady(false)
			return
		}
		setEvents(seed.map((e) => ({ ...e })))
		setReady(true)
	}, [sectionId, seed])

	const upsert = useCallback((event: SectionCalendarEvent) => {
		setEvents((prev) => {
			const i = prev.findIndex((e) => e.id === event.id)
			if (i === -1) return [...prev, event]
			const next = [...prev]
			next[i] = event
			return next
		})
	}, [])

	const remove = useCallback((id: number) => {
		setEvents((prev) => prev.filter((e) => e.id !== id))
	}, [])

	return { events, upsert, remove, ready }
}
