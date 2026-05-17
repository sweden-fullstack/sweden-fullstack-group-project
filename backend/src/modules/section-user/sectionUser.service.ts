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
import BadRequestError from "@/errors/BadRequestError"
import userRoleService from "../user-role/userRole.service"

class SectionUserService {
	async getAllByBuildingId(buildingId: number): Promise<SectionUserDto[]> {
		return (
			await sectionUserRepository.findAllByBuildingId(buildingId)
		).map((o) => SectionUserMapper.toDto(o))
	}

	async getAllBySectionId(sectionId: number): Promise<SectionUserDto[]> {
		return (await sectionUserRepository.findAllBySectionId(sectionId)).map(
			(o) => SectionUserMapper.toDto(o),
		)
	}

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
		return await Transaction.run(async () => {
			const sectionUserAsDto = user as SectionUserDto
			sectionUserAsDto.sectionId = sectionId
			sectionUserAsDto.roleId = (await userRoleService.getAll()).find(
				(o) => o.name === sectionUserAsDto.role,
			)!.id

			// Does email exists checks internally
			const createdUser = await userService.create(
				UserMapper.toDtoFromSectionUserDto(
					sectionUserAsDto,
				) as UserCreate,
			)

			sectionUserAsDto.userId = createdUser.id
			const createdSectionUser = await sectionUserRepository.create(
				SectionUserMapper.toEntity(
					sectionUserAsDto,
				) as SectionUserEntity,
			)

			if (!createdSectionUser) {
				throw new BadRequestError()
			}

			return await this.getBySectionIdAndUserId(
				createdSectionUser.section_id,
				createdSectionUser.user_id,
			)
		})
	}

	async update(sectionId: number, userId: number, user: SectionUserUpdate) {
		return await Transaction.run(async () => {
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

			const sectionUserModified = await sectionUserRepository.update(
				sectionId,
				userId,
				SectionUserMapper.toEntity(sectionUserAsDto),
			)

			if (!sectionUserModified) {
				throw new BadRequestError(
					`Section User with secionId ${sectionId} and userId ${userId} was either not found or there was nothing to update`,
				)
			}

			return await this.getBySectionIdAndUserId(
				sectionUserAsDto.sectionId,
				userId,
			)
		})
	}

	async delete(sectionId: number, userId: number) {
		return await Transaction.run(async () => {
			const sectionUserDeleted = await sectionUserRepository.delete(
				sectionId,
				userId,
			)
			if (!sectionUserDeleted) {
				throw new NotFoundError(
					`Section user with sectionId ${sectionId} and userId ${userId} not found`,
				)
			}

			const userDeleted = await userRepository.delete(userId)
			if (!userDeleted) {
				throw new NotFoundError(`User with id ${userId} not found`)
			}
		})
	}
}

export default new SectionUserService()
