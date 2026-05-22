import HouseRuleCategoryDto from "@/shared/types/house-rule-category-map/houseRuleCategory.dto"
import HouseRuleCategoryEntity from "@/modules/house-rule-category/types/houseRuleCategory.entity"

export default class HouseRuleCategoryMapper {
	static toEntity(dto: HouseRuleCategoryDto): HouseRuleCategoryEntity {
		return {
			house_rule_category_id: dto.houseRuleCategoryId,
			house_rule_category_name: dto.houseRuleCategoryName,
		}
	}

	static toDto(entity: HouseRuleCategoryEntity): HouseRuleCategoryDto {
		return {
			houseRuleCategoryId: entity.house_rule_category_id,
			houseRuleCategoryName: entity.house_rule_category_name,
		}
	}
}
