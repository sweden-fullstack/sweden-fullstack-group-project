import SectionDto from "@/shared/types/section/section.dto"
import SectionEntity from "@/modules/section/types/section.entity"

export default class SectionMapper {
	static toEntity(dto: Partial<SectionDto>): Partial<SectionEntity> {
		const entity: Partial<SectionEntity> = {}

		if (dto.id !== undefined) {
			entity.id = dto.id
		}

		if (dto.buildingId !== undefined) {
			entity.building_id = dto.buildingId
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
			buildingId: entity.building_id,
			name: entity.name,
			description: entity.description,
		}
	}
}
