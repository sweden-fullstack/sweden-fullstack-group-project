import UserDto from "@/shared/types/user/user.dto"
import envConfig from "@/config/env"
import axios from "@/config/axios"
import SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"
import SectionEventAssigneeDto from "@/shared/types/section-event-assignee/sectionEventAssignee.dto"
import SectionUserApi from "./sectionUser"

export type CleaningEventCreate = {
	title: string
	buildingId: number
	sectionId: number
	startTime: Date
	endTime: Date
	description: string
	users?: UserDto[]
}

class CleaningApi {
	path_event = `${envConfig.backend}section_event/`
	path_assignee = `${envConfig.backend}section_event_assignee/`

	async getBySection(sectionId: number) {
		const { data } = await axios.get(
			`${this.path_event}sectionId/${sectionId}`,
		)
		return data
			.filter((event: SectionEventDto) => event.eventTypeId === 2)
			.map((event: SectionEventDto) => ({
				...event,
				startTime: new Date(event.startTime),
				endTime: new Date(event.endTime),
			})) as SectionEventAssigneeDto[]
	}

	async create(payload: CleaningEventCreate) {
		const buildingId = (await SectionUserApi.getSelfAuthenticated())
			.buildingId
		const { data } = await axios.post(
			`${this.path_event}sectionId/${payload.sectionId}`,
			{
				title: "Cleaning Event",
				buildingId: buildingId,
				eventTypeId: 2,
				description: payload.description,
				startTime: payload.startTime,
				endTime: payload.endTime,
			},
		)

		const event = data as SectionEventAssigneeDto

		if (payload.users && payload.users.length > 0) {
			return await this.updateAssignees(event.id, payload.users)
		}

		return event
	}

	async updateAssignees(eventId: number, users: UserDto[]) {
		const userIds = users.map((u) => u.id)
		const { data } = await axios.put(
			`${this.path_assignee}eventId/${eventId}/assignees`,
			{ userIds },
		)
		// the backend might not return the full event, but we return a stub or ignore since the frontend refetches
		return data
	}

	async delete(eventId: number) {
		await axios.delete(`${this.path_event}eventId/${eventId}`)
	}
}

export default new CleaningApi()
