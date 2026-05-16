import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import sectionUserRepository from "./sectionUser.repository"
import NotFoundError from "@/errors/NotFoundError"
import SectionUserMapper from "./types/sectionUser.mapper"
import SectionUserCreate from "@/shared/types/section-user/sectionUser.create"
import { Transaction } from "@/utils/transaction"
import userRoleRepository from "../user-role/userRole.repository"
import UserMapper from "../user/types/user.mapper"
import userService from "../user/user.service"

class SectionUserService {
	async getByUserId(userId: number): Promise<SectionUserDto> {
		const user = await sectionUserRepository.findByUserId(userId)

		if (!user) {
			throw new NotFoundError("Section user not found")
		}

		return SectionUserMapper.toDto(user)
	}

	async create(user: SectionUserCreate) {
		return Transaction.run(async () => {
			const sectionUserAsDto = user as SectionUserDto
			sectionUserAsDto.roleId = (await userRoleRepository.findAll()).find(
				(o) => o.name === sectionUserAsDto.role,
			)!.id

			const insertedUserData = await userService.create(
				UserMapper.toCreateFromSectionUserDto(sectionUserAsDto),
			)
			sectionUserAsDto.userId = insertedUserData.id

			const insertedSectionData = await sectionUserRepository.create(
				SectionUserMapper.toEntity(sectionUserAsDto),
			)

			return SectionUserMapper.toDto(insertedSectionData)
		})
	}
}

export default new SectionUserService()
