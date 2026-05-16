import { UserRoleDto } from "@/shared/types/user-role/userRole.dto"
import { UserRoleEntity } from "./userRole.entity"

export default class UserRoleMapper {
	static toEntity(dto: Partial<UserRoleDto>): Partial<UserRoleEntity> {
		return {
			id: dto.id,
			name: dto.name,
		}
	}

	static toDto(entity: UserRoleEntity): UserRoleDto {
		return {
			id: entity.id,
			name: entity.name,
		}
	}
}
