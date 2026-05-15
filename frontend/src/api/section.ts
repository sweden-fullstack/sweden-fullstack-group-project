import type { SectionCalendarEvent } from "../features/section/types"

export type ResidentProfile = {
	id: number
	email: string
	fullName: string
	roomNumber: string
	stayPeriod: string
	major: string
	interests: string[]
	profilePictureUrl?: string
}

export type SectionDetails = {
	id: number
	name: string
	building: string
	description: string
	residents: ResidentProfile[]
	calendarEvents: SectionCalendarEvent[]
}

const calendarSeed: SectionCalendarEvent[] = [
	{
		id: 101,
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
		sectionId: 1,
		eventType: "section",
		title: "Quiet hours reminder",
		startTime: "2026-05-13T22:00:00",
		endTime: "2026-05-13T22:30:00",
		description: "Building-wide notice, no penalties, just a heads-up.",
		visibility: "building",
	},
]

const section: SectionDetails = {
	id: 1,
	name: "Section A",
	building: "Building 1",
	description:
		"A shared student corridor with kitchen, lounge, and study spaces.",
	residents: [
		{
			id: 1,
			email: "alice.smith@example.edu",
			fullName: "Alice Smith",
			roomNumber: "A-301",
			stayPeriod: "Aug 2025 – Jun 2026",
			major: "Computer Science",
			interests: ["Board games", "Running"],
		},
		{
			id: 2,
			email: "bob.lee@example.edu",
			fullName: "Bob Lee",
			roomNumber: "A-302",
			stayPeriod: "Jan 2026 – Dec 2026",
			major: "Business",
			interests: ["Cooking", "Films"],
		},
		{
			id: 3,
			email: "mike.wang@example.edu",
			fullName: "Mike Wang",
			roomNumber: "A-303",
			stayPeriod: "Sep 2025 – Aug 2026",
			major: "Environmental Science",
			interests: ["Climbing", "Photography"],
		},
		{
			id: 4,
			email: "amy.brown@example.edu",
			fullName: "Amy Brown",
			roomNumber: "A-304",
			stayPeriod: "Aug 2025 – Jun 2026",
			major: "Design",
			interests: ["Sketching", "Jazz"],
		},
	],
	calendarEvents: calendarSeed,
}

class SectionApi {
	async getCurrentSection() {
		// Later: return axios.get<SectionDetails>("/api/sections/me").then((res) => res.data)
		return section
	}
}

export default new SectionApi()
