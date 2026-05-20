import SectionEventAssigneeRepository from "@/modules/section-event-assignee/sectionEventAssignee.repository"
import SectionEventRepository from "@/modules/section-event/sectionEvent.repository"

class SectionEventAssigneeService {
	async update(eventId: number, userIds: number[]) {
		const event = SectionEventRepository.getEventById(eventId)
		if (!event) {
			throw new Error(`No event with the id ${eventId} found`)
		}

		return await SectionEventAssigneeRepository.updateAssignees(
			eventId,
			userIds,
		)
	}
}
export default new SectionEventAssigneeService()
