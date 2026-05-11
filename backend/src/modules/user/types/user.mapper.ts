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

		return entity
	}

	static toDto(entity: UserEntity): UserDto {
		return {
			id: entity.id,
			email: entity.email,
			firstName: "",
			lastName: "",
			sectionId: 0,
		}
	}
}
