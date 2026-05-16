import NotFoundError from "@/errors/NotFoundError"
import sectionRepository from "./section.repository"
import SectionMapper from "./types/section.mapper"
import SectionDto from "@/shared/types/section/section.dto"

class SectionUserService {
	async getById(id: number): Promise<SectionDto> {
		const section = await sectionRepository.findById(id)

		if (!section) {
			throw new NotFoundError("Section not found")
		}

		return SectionMapper.toDto(section)
	}
}

export default new SectionUserService()
