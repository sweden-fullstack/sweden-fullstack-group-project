import { removeUndefined } from "@/utils/mapper"
import HouseRuleDto from "@/shared/types/house-rule/houseRule.dto"
import HouseRuleEntity from "./houseRule.entity"

export default class HouseRuleMapper {
	static toEntity(dto: Partial<HouseRuleDto>): Partial<HouseRuleEntity> {
		return removeUndefined({
			id: dto.id,
			building_id: dto.buildingId,
			title: dto.title,
			body: dto.body,
			sort_order: dto.sortOrder,
			category_ids: dto.categoryIds,
		})
	}

	static toDto(entity: HouseRuleEntity): HouseRuleDto {
		return {
			id: entity.id,
			buildingId: entity.building_id,
			title: entity.title,
			body: entity.body,
			sortOrder: entity.sort_order,
			updatedAt: entity.updated_at,
			categoryIds: entity.category_ids,
		}
	}
}
