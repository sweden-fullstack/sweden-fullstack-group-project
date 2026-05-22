import axiosInstance from "@/config/axios"
import SectionEventDto, {
	SectionEventCreate,
} from "@/shared/types/section-event/sectionEvent.dto"
import SectionDto from "@/shared/types/section/section.dto"

export type ResidentProfile = {
	id: number
	sectionId: number
	email: string
	fullName: string
	roomNumber: string
	stayPeriod: string
	major: string
	interests: string[]
	profilePictureUrl?: string
}

export type SectionSummary = {
	id: number
	name: string
	building: string
}

export type SectionDetails = {
	id: number
	name: string
	building: string
	description: string
	calendarEvents: SectionEventDto[]
}

type SectionEventRaw = Omit<SectionEventDto, "startTime" | "endTime"> & {
	startTime: string | Date
	endTime: string | Date
}

const DEFAULT_BUILDING_ID = 1

export function normalizeSectionEvent(raw: SectionEventRaw): SectionEventDto {
	return {
		...raw,
		buildingId: raw.buildingId ?? DEFAULT_BUILDING_ID,
		startTime:
			raw.startTime instanceof Date
				? raw.startTime
				: new Date(raw.startTime),
		endTime:
			raw.endTime instanceof Date ? raw.endTime : new Date(raw.endTime),
	}
}

const buildingResidents: ResidentProfile[] = [
	{
		id: 1,
		sectionId: 1,
		email: "alice.smith@example.edu",
		fullName: "Alice Smith",
		roomNumber: "A-301",
		stayPeriod: "Aug 2025 – Jun 2026",
		major: "Computer Science",
		interests: ["Board games", "Running"],
	},
	{
		id: 2,
		sectionId: 1,
		email: "bob.lee@example.edu",
		fullName: "Bob Lee",
		roomNumber: "A-302",
		stayPeriod: "Jan 2026 – Dec 2026",
		major: "Business",
		interests: ["Cooking", "Films"],
	},
	{
		id: 3,
		sectionId: 1,
		email: "mike.wang@example.edu",
		fullName: "Mike Wang",
		roomNumber: "A-303",
		stayPeriod: "Sep 2025 – Aug 2026",
		major: "Environmental Science",
		interests: ["Climbing", "Photography"],
	},
	{
		id: 4,
		sectionId: 1,
		email: "amy.brown@example.edu",
		fullName: "Amy Brown",
		roomNumber: "A-304",
		stayPeriod: "Aug 2025 – Jun 2026",
		major: "Design",
		interests: ["Sketching", "Jazz"],
	},
	{
		id: 5,
		sectionId: 2,
		email: "carlos.vega@example.edu",
		fullName: "Carlos Vega",
		roomNumber: "B-201",
		stayPeriod: "Feb 2026 – Jan 2027",
		major: "Mechanical Engineering",
		interests: ["Cycling", "Coffee"],
	},
	{
		id: 6,
		sectionId: 2,
		email: "diana.kim@example.edu",
		fullName: "Diana Kim",
		roomNumber: "B-202",
		stayPeriod: "Aug 2025 – Jun 2026",
		major: "Architecture",
		interests: ["Pottery", "Hiking"],
	},
	{
		id: 7,
		sectionId: 2,
		email: "erik.johansson@example.edu",
		fullName: "Erik Johansson",
		roomNumber: "B-203",
		stayPeriod: "Sep 2025 – Aug 2026",
		major: "Physics",
		interests: ["Chess", "Podcasts"],
	},
]

const sectionsInBuilding: SectionSummary[] = [
	{ id: 1, name: "Section A", building: "Building 1" },
	{ id: 2, name: "Section B", building: "Building 1" },
]

const calendarSeedRaw: SectionEventRaw[] = [
	{
		id: 101,
		buildingId: 1,
		sectionId: 1,
		eventType: "section",
		title: "Common room dinner",
		startTime: "2026-05-18T18:30:00",
		endTime: "2026-05-18T21:00:00",
		description: "Bring one dish; kitchen stays tidy afterwards.",
		visibility: "section",
	},
	{
		id: 102,
		buildingId: 1,
		sectionId: 1,
		eventType: "section",
		title: "Building fire drill briefing",
		startTime: "2026-05-14T13:30:00",
		endTime: "2026-05-14T14:15:00",
		description: "Mandatory for all residents in Building 1.",
		visibility: "building",
	},
	{
		id: 103,
		buildingId: 1,
		sectionId: 1,
		eventType: "section",
		title: "Corridor deep clean",
		startTime: "2026-05-16T10:00:00",
		endTime: "2026-05-16T12:30:00",
		description: "Vacuum and mop; supplies in the storage closet.",
		visibility: "section",
	},
	{
		id: 104,
		buildingId: 1,
		sectionId: 1,
		eventType: "section",
		title: "Roof terrace welcome mixer",
		startTime: "2026-05-20T17:00:00",
		endTime: "2026-05-20T19:30:00",
		description: "Hosted by housing; all Building 1 sections invited.",
		visibility: "building",
	},
	{
		id: 105,
		buildingId: 1,
		sectionId: 1,
		eventType: "section",
		title: "Hot water inspection slot",
		startTime: "2026-05-22T09:00:00",
		endTime: "2026-05-22T11:00:00",
		description: "Technician may enter rooms with prior knock.",
		visibility: "building",
	},
	{
		id: 106,
		buildingId: 1,
		sectionId: 1,
		eventType: "section",
		title: "Board game night",
		startTime: "2026-05-25T20:00:00",
		endTime: "2026-05-27T22:00:00",
		description: "Long weekend setup; pack away by midnight Sunday.",
		visibility: "section",
	},
	{
		id: 107,
		buildingId: 1,
		sectionId: 1,
		eventType: "section",
		title: "Section budget check-in",
		startTime: "2026-05-13T08:15:00",
		endTime: "2026-05-13T09:00:00",
		description: "Quick numbers for shared supplies.",
		visibility: "section",
	},
	{
		id: 108,
		buildingId: 1,
		sectionId: 1,
		eventType: "section",
		title: "Recycling room tidy",
		startTime: "2026-05-13T15:00:00",
		endTime: "2026-05-13T15:45:00",
		description: "Flatten cardboard; nothing on the floor.",
		visibility: "section",
	},
	{
		id: 109,
		buildingId: 1,
		sectionId: 1,
		eventType: "section",
		title: "Quiet hours reminder",
		startTime: "2026-05-13T22:00:00",
		endTime: "2026-05-13T22:30:00",
		description: "Building-wide notice, no penalties, just a heads-up.",
		visibility: "building",
	},
]

let calendarEvents: SectionEventDto[] = calendarSeedRaw.map(
	normalizeSectionEvent,
)

function nextEventId() {
	return Math.max(0, ...calendarEvents.map((e) => e.id)) + 1
}

const section: SectionDetails = {
	id: 1,
	name: "Section A",
	building: "Building 1",
	description:
		"A shared student corridor with kitchen, lounge, and study spaces.",
	get calendarEvents() {
		return calendarEvents
	},
}

class SectionApi {
	path = "section"

	/**
	 * @param sectionId if undefined gets from jwt token
	 */
	async getById(sectionId?: number): Promise<SectionDto> {
		const { data } = await axiosInstance.get<SectionDto>(
			`${this.path}/${sectionId ?? ""}`,
		)
		return data
	}

	async getAllByBuildingId(buildingId?: number): Promise<SectionDto[]> {
		const { data } = await axiosInstance.get<SectionDto[]>(
			`${this.path}/building_id/${buildingId ?? ""}`,
		)
		return data
	}

	async getSectionsInBuilding(building: string) {
		// Later: return axios.get<SectionSummary[]>(`/api/buildings/${buildingId}/sections`).then((res) => res.data)
		return sectionsInBuilding.filter((s) => s.building === building)
	}

	async getBuildingResidents(building: string) {
		// Later: return axios.get<ResidentProfile[]>(`/api/buildings/${buildingId}/residents`).then((res) => res.data)
		const sectionIds = new Set(
			sectionsInBuilding
				.filter((s) => s.building === building)
				.map((s) => s.id),
		)
		return buildingResidents.filter((r) => sectionIds.has(r.sectionId))
	}
}

export default new SectionApi()
