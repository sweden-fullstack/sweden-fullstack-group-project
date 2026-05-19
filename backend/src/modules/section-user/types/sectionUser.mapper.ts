import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import SectionUserEntity from "./sectionUser.entity"
import { removeUndefined } from "@/utils/mapper"

export default class SectionUserMapper {
	static toEntity(dto: Partial<SectionUserDto>): Partial<SectionUserEntity> {
		return removeUndefined({
			role_id: dto.roleId,
			section_id: dto.sectionId,
			user_id: dto.userId,
		})
	}

	static toDto(entity: SectionUserEntity): SectionUserDto {
		return {
			roleId: entity.role_id,
			sectionId: entity.section_id,
			userId: entity.user_id,

			// From joins
			role: entity.role,
			email: entity.email,
			firstName: entity.first_name,
			lastName: entity.last_name,
			roomNumber: entity.room_number,
			major: entity.major,
			stayPeriodStart: entity.stay_period_start,
			stayPeriodEnd: entity.stay_period_end,
			profilePictureUrl: entity.profile_picture_url,
		}
	}
}
