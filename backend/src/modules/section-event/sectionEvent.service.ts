import { Transaction } from "@/utils/transaction"
import sectionEventRepository from "@/modules/section-event/sectionEvent.repository"
import NotFoundError from "@/errors/NotFoundError"
import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"
import SectionEventMapper from "@/modules/section-event/types/sectionEvent.mapper"
import SectionEventEntity from "@/modules/section-event/types/sectionEvent.entity"
import sectionUserService from "../section-user/sectionUser.service"

class SectionEventService {
	async getAllBySectionId(sectionId: number) {
		return await Transaction.run(async () => {
			const events =
				await sectionEventRepository.getAllBySectionId(sectionId)
			const dtos = events.map((o) => SectionEventMapper.toDto(o))

			for (const dto of dtos) {
				dto.users = await sectionUserService.getAllBySectionEventId(
					dto.id,
				)
			}

			return dtos
		})
	}

	async getById(id: number) {
		const entity = await sectionEventRepository.getById(id)
		return SectionEventMapper.toDto(entity)
	}

	async create(sectionId: number, userId: number, event: SectionEventCreate) {
		return await Transaction.run(async () => {
			const sectionUser =
				await sectionUserService.getBySectionIdAndUserId(
					sectionId,
					userId,
				)

			if (!sectionUser) {
				throw new NotFoundError("User not found in this section")
			}
			const entity = SectionEventMapper.toEntity(event)
			entity.section_id = sectionId
			entity.building_id = sectionUser.buildingId

			const eventId = await sectionEventRepository.create(
				entity as SectionEventEntity,
			)

			return await this.getById(eventId)
		})
	}

	async delete(id: number) {
		return await Transaction.run(async () => {
			const sectionEventDeleted = await sectionEventRepository.delete(id)

			if (!sectionEventDeleted) {
				throw new NotFoundError(
					`Section event with eventId ${id} not found`,
				)
			}
		})
	}
}

export default new SectionEventService()
