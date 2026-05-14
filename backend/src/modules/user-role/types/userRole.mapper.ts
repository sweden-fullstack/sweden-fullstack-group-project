import { UserRoleDto } from "@/shared/types/user-role/userRole.dto"
import { UserRoleEntity } from "./userRole.entity"

export default class UserRoleMapper {
	static toEntity(dto: Partial<UserRoleDto>): Partial<UserRoleEntity> {
		const entity: Partial<UserRoleEntity> = {}

		if (dto.id !== undefined) {
			entity.id = dto.id
		}

		if (dto.name !== undefined) {
			entity.name = dto.name
		}

		return entity
	}

	static toDto(entity: UserRoleEntity): UserRoleDto {
		return {
			id: entity.id,
			name: entity.name,
		}
	}
}
