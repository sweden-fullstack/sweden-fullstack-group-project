import sectionEventAssigneeRepository from "@/modules/section-event-assignee/sectionEventAssignee.repository"
import { Transaction } from "@/utils/transaction"
import sectionEventRepository from "@/modules/section-event/sectionEvent.repository"
import NotFoundError from "@/errors/NotFoundError"
import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"
import SectionEventMapper from "@/modules/section-event/types/sectionEventMapper"
import SectionEventEntity from "@/modules/section-event/types/sectionEvent.entity"

class SectionEventService {
	async create(sectionId: number, event: SectionEventCreate) {
		return await Transaction.run(async () => {
			const entity = SectionEventMapper.toEntity(event)
			entity.section_id = sectionId

			const eventId = await sectionEventRepository.create(
				entity as SectionEventEntity,
			)

			const createdEvent =
				await sectionEventRepository.getEventById(eventId)

			return SectionEventMapper.toDto(createdEvent)
		})
	}

	async getBySection(sectionId: number) {
		return await Transaction.run(async () => {
			const events =
				await sectionEventRepository.getEventBySection(sectionId)
			for (const event of events) {
				event.users =
					await sectionEventAssigneeRepository.getAssigneesByEventId(
						event.id,
					)
			}
			return events.map((e) => SectionEventMapper.toDto(e))
		})
	}

	async delete(eventId: number) {
		return await Transaction.run(async () => {
			const sectionEventDeleted =
				await sectionEventRepository.deleteSectionEvent(eventId)

			if (!sectionEventDeleted) {
				throw new NotFoundError(
					`Section event with eventId ${eventId} not found`,
				)
			}
		})
	}
}

export default new SectionEventService()
