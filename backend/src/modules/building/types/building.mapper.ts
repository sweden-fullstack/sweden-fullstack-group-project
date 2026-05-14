import BuildingDto from "@/shared/types/building/building.dto"
import BuildingEntity from "./building.entity"

export default class BuildingMapper {
	static toEntity(dto: Partial<BuildingDto>): Partial<BuildingEntity> {
		const entity: Partial<BuildingEntity> = {}

		if (dto.id !== undefined) {
			entity.id = dto.id
		}

		if (dto.name !== undefined) {
			entity.name = dto.name
		}

		if (dto.description !== undefined) {
			entity.description = dto.description
		}

		return entity
	}

	static toDto(entity: BuildingEntity): BuildingDto {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
		}
	}
}
