import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import sectionUserRepository from "./sectionUser.repository"
import NotFoundError from "@/errors/NotFoundError"
import SectionUserMapper from "./types/sectionUser.mapper"
import SectionUserCreate from "@/shared/types/section-user/sectionUser.create"
import { Transaction } from "@/utils/transaction"
import userRoleRepository from "../user-role/userRole.repository"
import UserMapper from "../user/types/user.mapper"
import userService from "../user/user.service"
import UserCreate from "@/shared/types/user/user.create"
import UserUpdate from "@/shared/types/user/user.update"
import SectionUserUpdate from "@/shared/types/section-user/sectionUser.update"
import SectionUserEntity from "./types/sectionUser.entity"
import userRepository from "../user/user.repository"

class SectionUserService {
	async getBySectionIdAndUserId(
		sectionId: number,
		userId: number,
	): Promise<SectionUserDto> {
		const user = await sectionUserRepository.findBySectionIdAndUserId(
			sectionId,
			userId,
		)

		if (!user) {
			throw new NotFoundError("Section user not found")
		}

		return SectionUserMapper.toDto(user)
	}

	async create(sectionId: number, user: SectionUserCreate) {
		return Transaction.run(async () => {
			const sectionUserAsDto = user as SectionUserDto
			sectionUserAsDto.sectionId = sectionId
			sectionUserAsDto.roleId = (await userRoleRepository.findAll()).find(
				(o) => o.name === sectionUserAsDto.role,
			)!.id

			const insertedUserData = await userService.create(
				UserMapper.toDtoFromSectionUserDto(
					sectionUserAsDto,
				) as UserCreate,
			)
			sectionUserAsDto.userId = insertedUserData.id

			const insertedSectionData = await sectionUserRepository.create(
				SectionUserMapper.toEntity(
					sectionUserAsDto,
				) as SectionUserEntity,
			)

			return SectionUserMapper.toDto(insertedSectionData)
		})
	}

	async update(sectionId: number, userId: number, user: SectionUserUpdate) {
		return Transaction.run(async () => {
			const sectionUserAsDto = user as SectionUserDto
			sectionUserAsDto.userId = userId
			sectionUserAsDto.sectionId = sectionId
			sectionUserAsDto.roleId = (await userRoleRepository.findAll()).find(
				(o) => o.name === sectionUserAsDto.role,
			)!.id

			await userService.update(
				userId,
				UserMapper.toDtoFromSectionUserDto(
					sectionUserAsDto,
				) as UserUpdate,
			)

			await sectionUserRepository.update(
				sectionId,
				userId,
				SectionUserMapper.toEntity(sectionUserAsDto),
			)

			const updatedUser = await this.getBySectionIdAndUserId(
				sectionUserAsDto.sectionId,
				userId,
			)
			return SectionUserMapper.toEntity(updatedUser)
		})
	}

	async delete(sectionId: number, userId: number) {
		return Transaction.run(async () => {
			const sectionUserDeleted = await sectionUserRepository.delete(
				sectionId,
				userId,
			)
			if (!sectionUserDeleted) {
				throw new NotFoundError("")
			}

			const userDeleted = await userRepository.delete(userId)
			if (!userDeleted) {
				throw new NotFoundError("")
			}
		})
	}
}

export default new SectionUserService()
