import SectionDto from "@/shared/types/section/section.dto"
import sectionRepository from "@/modules/section/section.repository"
import SectionMapper from "@/modules/section/types/section.mapper"
import NotFoundError from "@/errors/NotFoundError"
import SectionCreate from "@/shared/types/section/section.create"
import { Transaction } from "@/utils/transaction"
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
		return Transaction.run(async () => {
			const id = await sectionRepository.create(section)
			return await this.getById(id)
		})
	}

	async update(id: number, section: SectionUpdate): Promise<SectionDto> {
		return Transaction.run(async () => {
			await sectionRepository.update(id, section)
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
