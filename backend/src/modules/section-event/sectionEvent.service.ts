import { Transaction } from "@/utils/transaction"
import sectionEventRepository from "@/modules/section-event/sectionEvent.repository"
import NotFoundError from "@/errors/NotFoundError"
import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"
import SectionEventMapper from "@/modules/section-event/types/sectionEvent.mapper"
import SectionEventEntity from "@/modules/section-event/types/sectionEvent.entity"
import sectionUserService from "../section-user/sectionUser.service"
import SectionEventUpdate from "@/shared/types/section-event/sectionEvent.update"

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

	async create(
		buildingId: number,
		event: SectionEventCreate,
		sectionId?: number,
	) {
		return await Transaction.run(async () => {
			const entity = SectionEventMapper.toEntity(event)
			entity.section_id = sectionId
			entity.building_id = buildingId

			const eventId = await sectionEventRepository.create(
				entity as SectionEventEntity,
			)

			return await this.getById(eventId)
		})
	}

	async update(id: number, section: SectionEventUpdate) {
		return await Transaction.run(async () => {
			const entity = SectionEventMapper.toEntity(section)
			await sectionEventRepository.update(id, entity)
			return await this.getById(id)
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
