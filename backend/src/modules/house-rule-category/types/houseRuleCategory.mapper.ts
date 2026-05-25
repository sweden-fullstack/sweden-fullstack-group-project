import HouseRuleCategoryDto from "@/shared/types/house-rule-category/houseRuleCategory.dto"
import HouseRuleCategoryEntity from "@/modules/house-rule-category/types/houseRuleCategory.entity"

export default class HouseRuleCategoryMapper {
	static toEntity(dto: HouseRuleCategoryDto): HouseRuleCategoryEntity {
		return {
			id: dto.id,
			name: dto.categoryName,
		}
	}

	static toDto(entity: HouseRuleCategoryEntity): HouseRuleCategoryDto {
		return {
			id: entity.id,
			categoryName: entity.name,
		}
	}
}
