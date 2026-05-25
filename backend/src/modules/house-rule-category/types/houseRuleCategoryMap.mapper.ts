import HouseRuleCategoryMapDto from "../../../../../shared/types/house-rule-category-map/houseRuleCategoryMap.dto"
import HouseRuleCategoryMapEntity from "@/modules/house-rule-category/types/houseRuleCategoryMap.entity"

export default class HouseRuleCategoryMapMapper {
	static toEntity(dto: HouseRuleCategoryMapDto): HouseRuleCategoryMapEntity {
		return {
			house_rule_id: dto.houseRuleId,
			house_rule_category_id: dto.houseRuleCategoryId,
		}
	}

	static toDto(entity: HouseRuleCategoryMapEntity): HouseRuleCategoryMapDto {
		return {
			houseRuleId: entity.house_rule_id,
			houseRuleCategoryId: entity.house_rule_category_id,
			houseRuleCategoryName: entity.house_rule_category_name,
		}
	}
}
