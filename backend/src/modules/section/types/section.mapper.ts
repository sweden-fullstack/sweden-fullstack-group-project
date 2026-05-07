import SectionDto from "@/shared/types/section/section.dto"
import SectionEntity from "@/modules/section/types/section.entity"

export default class SectionMapper {
	static toEntity(dto: Partial<SectionDto>): Partial<SectionEntity> {
		const entity: Partial<SectionEntity> = {}

		if (dto.id !== undefined) {
			entity.id = dto.id
		}

		if (dto.building_id !== undefined) {
			entity.building_id = dto.building_id
		}

		if (dto.name !== undefined) {
			entity.name = dto.name
		}

		if (dto.description !== undefined) {
			entity.description = dto.description
		}

		return entity
	}

	static toDto(entity: SectionEntity): SectionDto {
		return {
			id: entity.id,
			building_id: entity.building_id,
			name: entity.name,
			description: entity.description,
		}
	}
}
