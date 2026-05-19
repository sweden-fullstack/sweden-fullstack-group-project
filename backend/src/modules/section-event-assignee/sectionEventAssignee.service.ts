import SectionEventAssigneeRepository from "@/modules/section-event-assignee/sectionEventAssignee.repository"

class SectionEventAssigneeService {
	async update(eventId: number, userIds: number[]) {
		return await SectionEventAssigneeRepository.updateAssignees(
			eventId,
			userIds,
		)
	}
}
export default new SectionEventAssigneeService()
