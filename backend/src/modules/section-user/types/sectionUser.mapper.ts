import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import SectionUserEntity from "./sectionUser.entity"

export default class SectionUserMapper {
	static toEntity(dto: Partial<SectionUserDto>): Partial<SectionUserEntity> {
		const entity: Partial<SectionUserEntity> = {}

		if (dto.roleId !== undefined) {
			entity.role_id = dto.roleId
		}

		if (dto.sectionId !== undefined) {
			entity.section_id = dto.sectionId
		}

		if (dto.userId !== undefined) {
			entity.user_id = dto.userId
		}

		return entity
	}

	static toDto(entity: SectionUserEntity): SectionUserDto {
		return {
			roleId: entity.role_id,
			sectionId: entity.section_id,
			userId: entity.user_id,
		}
	}
}
