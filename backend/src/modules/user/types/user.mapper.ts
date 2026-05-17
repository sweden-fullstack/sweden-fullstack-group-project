import UserDto from "@/shared/types/user/user.dto"
import UserEntity from "./user.entity"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import { removeUndefined } from "@/utils/mapper"
import BadRequestError from "@/errors/BadRequestError"

export default class UserMapper {
	static toEntity(dto: Partial<UserDto>): Partial<UserEntity> {
		this.validate(dto)

		return removeUndefined({
			id: dto.id,
			email: dto.email,
			first_name: dto.firstName,
			last_name: dto.lastName,
			room_number: dto.roomNumber,
			major: dto.major,
			stay_period_start: dto.stayPeriodStart,
			stay_period_end: dto.stayPeriodEnd,
		})
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

			// From joins
			role: entity.role,
			roleId: entity.role_id,
			sectionId: entity.section_id,
			buildingId: entity.building_id,
		}
	}

	static toDtoFromSectionUserDto(dto: SectionUserDto): Partial<UserDto> {
		return {
			email: dto.email!,
			firstName: dto.firstName!,
			lastName: dto.lastName!,
			roomNumber: dto.roomNumber!,
			major: dto.major!,
			stayPeriodStart: dto.stayPeriodStart!,
			stayPeriodEnd: dto.stayPeriodEnd!,
		}
	}

	static validate(dto: Partial<UserDto>) {
		if (dto.stayPeriodStart && dto.stayPeriodEnd) {
			if (dto.stayPeriodStart > dto.stayPeriodEnd) {
				throw new BadRequestError(
					"Start date can't be bigger than end date",
				)
			}
		}
	}
}
