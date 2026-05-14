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
			entity.first_name = dto.firstName
		}

		if (dto.lastName !== undefined) {
			entity.last_name = dto.lastName
		}

		if (dto.roomNumber !== undefined) {
			entity.room_number = dto.roomNumber
		}

		if (dto.major !== undefined) {
			entity.major = dto.major
		}

		if (dto.stayPeriodStart !== undefined) {
			entity.stay_period_start = dto.stayPeriodStart
		}

		if (dto.stayPeriodEnd !== undefined) {
			entity.stay_period_end = dto.stayPeriodEnd
		}

		if (dto.sectionId !== undefined) {
			entity.section_id = dto.sectionId
		}

		if (dto.roleId !== undefined) {
			entity.role_id = dto.roleId
		}

		if (dto.role !== undefined) {
			entity.role = dto.role
		}

		return entity
	}

	static toDto(entity: UserEntity): UserDto {
		return {
			id: entity.id,
			email: entity.email,
			firstName: entity.first_name,
			lastName: entity.last_name,
			roomNumber: entity.room_number,
			major: entity.major,
			stayPeriodStart: entity.stay_period_start,
			stayPeriodEnd: entity.stay_period_end,
			profilePictureUrl: entity.profile_picture_url,
			sectionId: entity.section_id,
			roleId: entity.role_id,
			buildingId: entity.building_id,
			role: entity.role,
		}
	}
}
