import NotFoundError from "@/errors/NotFoundError"
import sectionRepository from "./section.repository"
import SectionMapper from "./types/section.mapper"
import SectionDto from "@/shared/types/section/section.dto"
import { Transaction } from "@/utils/transaction"
import SectionCreate from "@/shared/types/section/section.create"
import SectionEntity from "./types/section.entity"
import SectionUpdate from "@/shared/types/section/section.update"
import sectionEventService from "../section-event/sectionEvent.service"

class SectionService {
	async getAll(): Promise<SectionDto[]> {
		return (await sectionRepository.findAll()).map((o) =>
			SectionMapper.toDto(o),
		)
	}

	async getAllByBuildingId(buildingId: number): Promise<SectionDto[]> {
		return (await sectionRepository.findAllByBuildingId(buildingId)).map(
			(o) => SectionMapper.toDto(o),
		)
	}

	async getById(id: number): Promise<SectionDto> {
		return await Transaction.run(async () => {
			const section = await sectionRepository.findById(id)

			if (!section) {
				throw new NotFoundError("Section not found")
			}

			const dto = SectionMapper.toDto(section)
			const events = await sectionEventService.getAllBySectionId(
				section.id,
			)
			dto.events = events

			return dto
		})
	}

	async create(section: SectionCreate): Promise<SectionDto> {
		return await Transaction.run(async () => {
			const entity = SectionMapper.toEntity(section) as SectionEntity
			const id = await sectionRepository.create(entity)
			return await this.getById(id)
		})
	}

	async update(id: number, section: SectionUpdate): Promise<SectionDto> {
		return await Transaction.run(async () => {
			const entity = SectionMapper.toEntity(section)
			await sectionRepository.update(id, entity)
			return await this.getById(id)
		})
	}

	async delete(id: number): Promise<void> {
		const deleted = await sectionRepository.delete(id)
		if (!deleted) {
			throw new NotFoundError("Section not found")
		}
	}
}

export default new SectionService()
