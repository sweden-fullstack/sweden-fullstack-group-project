import SectionApi from "@/api/section"
import { create } from "zustand"
import type {
	SectionCalendarEvent,
	SectionEventCreate,
} from "@/features/section/types"
import { applyVisibilityToSectionId } from "@/features/section/utils/eventVisibility"

type SectionCalendarState = {
	sectionId: number | null
	events: SectionCalendarEvent[]
	ready: boolean
	init: (sectionId: number, seed: SectionCalendarEvent[]) => void
	create: (
		sectionId: number,
		payload: SectionEventCreate,
	) => Promise<SectionCalendarEvent>
	update: (event: SectionCalendarEvent) => Promise<void>
	remove: (id: number) => Promise<void>
}

function withVisibilitySectionId(
	event: SectionEventCreate | SectionCalendarEvent,
	sectionId: number,
): SectionEventCreate | SectionCalendarEvent {
	const visibility = event.visibility ?? "section"
	return {
		...event,
		visibility,
		sectionId: applyVisibilityToSectionId(visibility, sectionId),
	}
}

export const useSectionCalendarStore = create<SectionCalendarState>(
	(set, get) => ({
		sectionId: null,
		events: [],
		ready: false,

		init(sectionId, seed) {
			set({
				sectionId,
				events: seed.map((e) => ({
					...e,
					startTime: new Date(e.startTime),
					endTime: new Date(e.endTime),
				})),
				ready: true,
			})
		},

		async create(sectionId, payload) {
			const body = withVisibilitySectionId(payload, sectionId)
			const created = await SectionApi.createEvent(sectionId, body)
			set((state) => ({ events: [...state.events, created] }))
			return created
		},

		async update(event) {
			const sectionId = get().sectionId
			if (sectionId == null) return
			const body = withVisibilitySectionId(
				event,
				sectionId,
			) as SectionCalendarEvent
			const updated = await SectionApi.updateEvent(body)
			set((state) => ({
				events: state.events.map((e) =>
					e.id === updated.id ? updated : e,
				),
			}))
		},

		async remove(id) {
			await SectionApi.deleteEvent(id)
			set((state) => ({
				events: state.events.filter((e) => e.id !== id),
			}))
		},
	}),
)

export default useSectionCalendarStore
