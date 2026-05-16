import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import SectionUserEntity from "./sectionUser.entity"

export default class SectionUserMapper {
	static toEntity(dto: Partial<SectionUserDto>): Partial<SectionUserEntity> {
		return {
			role_id: dto.roleId,
			section_id: dto.sectionId,
			user_id: dto.userId,
		}
	}

	static toDto(entity: SectionUserEntity): SectionUserDto {
		return {
			roleId: entity.role_id,
			sectionId: entity.section_id,
			userId: entity.user_id,
			role: entity.role,
		}
	}
}
