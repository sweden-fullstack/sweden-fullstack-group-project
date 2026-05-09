import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import sectionUserRepository from "./sectionUser.repository"
import NotFoundError from "@/errors/NotFoundError"
import SectionUserMapper from "./types/sectionUser.mapper"

class SectionUserService {
	async getByUserIdAndSectionId(
		userId: number,
		sectionId: number,
	): Promise<SectionUserDto> {
		const user = await sectionUserRepository.findByUserIdAndSectionId(
			userId,
			sectionId,
		)

		if (!user) {
			throw new NotFoundError("Section user not found")
		}

		return SectionUserMapper.toDto(user)
	}
}

export default new SectionUserService()
