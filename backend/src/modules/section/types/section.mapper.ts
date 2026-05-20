import SectionDto from "@/shared/types/section/section.dto"
import SectionEntity from "./section.entity"
import { removeUndefined } from "@/utils/mapper"

export default class SectionMapper {
	static toEntity(dto: Partial<SectionDto>): Partial<SectionEntity> {
		return removeUndefined({
			id: dto.id,
			building_id: dto.buildingId,
			name: dto.name,
			description: dto.description,
		})
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
