import SectionApi from "@/api/section"
import SectionEventDto, {
	SectionEventCreate,
} from "@/shared/types/section-event/sectionEvent.dto"
import { create } from "zustand"

type SectionCalendarState = {
	sectionId: number | null
	events: SectionEventDto[]
	init: (sectionId: number, seed: SectionEventDto[]) => void
	create: (
		sectionId: number,
		payload: SectionEventCreate,
	) => Promise<SectionEventDto>
	update: (event: SectionEventDto) => Promise<void>
	remove: (id: number) => Promise<void>
}

function withVisibilitySectionId(
	event: SectionEventCreate | SectionEventDto,
): SectionEventCreate | SectionEventDto {
	return {
		...event,
	}
}

export const useSectionCalendarStore = create<SectionCalendarState>(
	(set, get) => ({
		sectionId: null,
		events: [],

		init(sectionId, seed) {
			set({
				sectionId,
				events: seed,
			})
		},

		async create(sectionId, payload) {
			const body = withVisibilitySectionId(payload)
			const created = await SectionApi.createEvent(sectionId, body)
			set((state) => ({ events: [...state.events, created] }))
			return created
		},

		async update(event) {
			const sectionId = get().sectionId
			if (sectionId == null) return
			const body = withVisibilitySectionId(event) as SectionEventDto
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
