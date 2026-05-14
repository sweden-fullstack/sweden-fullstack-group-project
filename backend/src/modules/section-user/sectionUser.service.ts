import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import sectionUserRepository from "./sectionUser.repository"
import NotFoundError from "@/errors/NotFoundError"
import SectionUserMapper from "./types/sectionUser.mapper"

class SectionUserService {
	async getByUserId(userId: number): Promise<SectionUserDto> {
		const user = await sectionUserRepository.findByUserId(userId)

		if (!user) {
			throw new NotFoundError("Section user not found")
		}

		return SectionUserMapper.toDto(user)
	}
}

export default new SectionUserService()
