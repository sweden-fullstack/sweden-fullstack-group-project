import SectionEventAssigneeRepository from "@/modules/section-event-assignee/sectionEventAssignee.repository"
import SectionEventRepository from "@/modules/section-event/sectionEvent.repository"

class SectionEventAssigneeService {
	async overrideAssignees(eventId: number, userIds: number[]) {
		const event = SectionEventRepository.getById(eventId)
		if (!event) {
			throw new Error(`No event with the id ${eventId} found`)
		}

		return await SectionEventAssigneeRepository.overrideAssignees(
			eventId,
			userIds,
		)
	}
}
export default new SectionEventAssigneeService()
