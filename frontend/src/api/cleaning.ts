import SectionEventCleaningDto from "@/shared/types/section-event/sectionEventCleaning.dto"
import UserDto from "@/shared/types/user/user.dto"

export type CleaningEventCreate = {
	sectionId: number
	startTime: Date
	endTime: Date
	description: string
	users?: UserDto[]
}

let cleaning: SectionEventCleaningDto[] = [
	{
		id: 1,
		sectionId: 1,
		eventType: "cleaning",
		startTime: new Date("2026-05-08T10:00:00Z"),
		endTime: new Date("2026-05-08T11:00:00Z"),
		description: "Kitchen",
		users: [
			{
				id: 1,
				email: "",
				firstName: "Alice",
				lastName: "Smith",
				sectionId: 1,
			},
		],
	},
	{
		id: 2,
		sectionId: 1,
		eventType: "cleaning",
		startTime: new Date("2026-05-09T10:00:00Z"),
		endTime: new Date("2026-05-09T11:00:00Z"),
		description: "Trash",
	},
	{
		id: 3,
		sectionId: 1,
		eventType: "cleaning",
		startTime: new Date("2026-05-10T13:00:00Z"),
		endTime: new Date("2026-05-10T14:00:00Z"),
		description: "Bathroom",
		users: [
			{
				id: 2,
				email: "",
				firstName: "Bob",
				lastName: "Lee",
				sectionId: 1,
			},
		],
	},
	{
		id: 4,
		sectionId: 1,
		eventType: "cleaning",
		startTime: new Date("2026-05-11T08:30:00Z"),
		endTime: new Date("2026-05-11T09:30:00Z"),
		description: "Stairwell",
	},
	{
		id: 5,
		sectionId: 1,
		eventType: "cleaning",
		startTime: new Date("2026-05-12T17:00:00Z"),
		endTime: new Date("2026-05-12T18:00:00Z"),
		description: "Laundry Room",
		users: [
			{
				id: 3,
				email: "",
				firstName: "Cathy",
				lastName: "Wang",
				sectionId: 1,
			},
			{
				id: 4,
				email: "",
				firstName: "David",
				lastName: "Brown",
				sectionId: 1,
			},
		],
	},
]

let nextEventId =
	cleaning.reduce((max, event) => Math.max(max, event.id), 0) + 1

class CleaningApi {
	async getBySection(sectionId: number) {
		// Later: return axios.get<SectionEventCleaningDto[]>(`/api/sections/${sectionId}/cleaning`).then((res) => res.data)
		return cleaning
			.filter((event) => event.sectionId === sectionId)
			.map((event) => ({ ...event }))
	}

	async create(payload: CleaningEventCreate) {
		// Later: return axios.post<SectionEventCleaningDto>("/api/cleaning", payload).then((res) => res.data)
		const event: SectionEventCleaningDto = {
			id: nextEventId++,
			eventType: "cleaning",
			...payload,
		}
		cleaning.push(event)
		return { ...event }
	}

	async updateAssignees(eventId: number, users: UserDto[]) {
		// Later: return axios.put<SectionEventCleaningDto>(`/api/cleaning/${eventId}/assignees`, { users }).then((res) => res.data)
		const index = cleaning.findIndex((event) => event.id === eventId)
		if (index < 0) {
			throw new Error(`Cleaning event ${eventId} not found`)
		}
		cleaning[index] = { ...cleaning[index], users }
		return { ...cleaning[index] }
	}

	async delete(eventId: number) {
		// Later: await axios.delete(`/api/cleaning/${eventId}`)
		cleaning = cleaning.filter((event) => event.id !== eventId)
	}
}

export default new CleaningApi()
