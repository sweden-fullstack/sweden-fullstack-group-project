import UserDto from "@/shared/types/user/user.dto"
import UserEntity from "./user.entity"

export default class UserMapper {
	static toEntity(dto: Partial<UserDto>): Partial<UserEntity> {
		const entity: Partial<UserEntity> = {}

		if (dto.id !== undefined) {
			entity.id = dto.id
		}

		if (dto.email !== undefined) {
			entity.email = dto.email
		}
		if (dto.firstName !== undefined) {
			entity.firstName = dto.firstName
		}
		if (dto.lastName !== undefined) {
			entity.lastName = dto.lastName
		}
		if (dto.sectionId !== undefined) {
			entity.sectionId = dto.sectionId
		}

		return entity
	}

	static toDto(entity: UserEntity): UserDto {
		return {
			id: entity.id,
			email: entity.email,
			firstName: entity.firstName,
			lastName: entity.lastName,
			sectionId: entity.sectionId,
		}
	}
}
