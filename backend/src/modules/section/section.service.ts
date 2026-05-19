import NotFoundError from "@/errors/NotFoundError"
import sectionRepository from "./section.repository"
import SectionMapper from "./types/section.mapper"
import SectionDto from "@/shared/types/section/section.dto"
import { Transaction } from "@/utils/transaction"
import SectionCreate from "@/shared/types/section/section.create"
import SectionEntity from "./types/section.entity"
import SectionUpdate from "@/shared/types/section/section.update"

class SectionService {
	async getAll(): Promise<SectionDto[]> {
		return (await sectionRepository.findAll()).map((o) =>
			SectionMapper.toDto(o),
		)
	}

	async getById(id: number): Promise<SectionDto> {
		const section = await sectionRepository.findById(id)

		if (!section) {
			throw new NotFoundError("Section not found")
		}

		return SectionMapper.toDto(section)
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
