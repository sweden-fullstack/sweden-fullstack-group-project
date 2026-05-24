export type ResidentProfile = {
	id: number
	fullName: string
	roomNumber: string
	stayPeriod: string
	major: string
	interests: string[]
	profilePictureUrl?: string
}

export type SectionEvent = {
	id: number
	title: string
	startTime: string
	location: string
	description: string
}

export type SectionDetails = {
	id: number
	name: string
	building: string
	description: string
	residents: ResidentProfile[]
	events: SectionEvent[]
}

const section: SectionDetails = {
	id: 1,
	name: "Section A",
	building: "Building 1",
	description:
		"A shared student corridor with kitchen, lounge, and study spaces.",
	residents: [
		{
			id: 1,
			fullName: "Alex Morgan",
			roomNumber: "A-301",
			stayPeriod: "Aug 2025 - Jun 2026",
			major: "Computer Science",
			interests: ["Board games", "Running"],
		},
		{
			id: 2,
			fullName: "Sam Rivera",
			roomNumber: "A-302",
			stayPeriod: "Jan 2026 - Dec 2026",
			major: "Business",
			interests: ["Cooking", "Films"],
		},
	],
	events: [
		{
			id: 1,
			title: "Common room dinner",
			startTime: "2026-05-03 18:30",
			location: "Section A kitchen",
			description: "Bring one dish or snack to share with the section.",
		},
	],
}

class SectionApi {
	async getCurrentSection() {
		// Later: return axios.get<SectionDetails>("/api/sections/me").then((res) => res.data)
		return section
	}
}

export default new SectionApi()
