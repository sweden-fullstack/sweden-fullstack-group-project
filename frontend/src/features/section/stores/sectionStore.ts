import SectionEventDto, {
	SectionEventCreate,
} from "@/shared/types/section-event/sectionEvent.dto"
import SectionDto from "@/shared/types/section/section.dto"

import SectionApi from "@/api/section"
import { create } from "zustand"

type SectionState = {
	sections: SectionDto[]
	getById: (id: number, forceRefetch?: boolean) => Promise<SectionDto>
}

type SectionStateOld = {
	sections: SectionDto[]
	getById: (id: number) => Promise<SectionDto>
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

export const useSectionStore = create<SectionState>()((set, get) => ({
	sections: [],
	getById: async (id: number, forceRefetch?: boolean) => {
		const section = get().sections.find((o) => o.id === id)
		if (!section || forceRefetch) {
			const fetched = await SectionApi.getById(id)
			set((state) => ({
				sections: [...state.sections, fetched],
			}))
		}

		return get().sections.find((o) => o.id === id)!
	},
}))

export const useSectionCalendarStore = create<SectionStateOld>((set, get) => ({
	sections: [],

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
}))

export default useSectionCalendarStore
