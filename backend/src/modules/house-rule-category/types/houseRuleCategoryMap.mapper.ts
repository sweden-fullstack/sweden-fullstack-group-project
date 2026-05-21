import HouseRuleCategorymMapDto from "@/shared/types/house-rule-category-map/houseRuleCategorymMap.dto"
import HouseRuleCategoryMapEntity from "@/modules/house-rule-category/types/houseRuleCategoryMap.entity"

export default class HouseRuleCategoryMapMapper {
	static toEntity(dto: HouseRuleCategorymMapDto): HouseRuleCategoryMapEntity {
		return {
			house_rule_id: dto.houseRuleId,
			house_rule_category_id: dto.houseRuleCategoryId,
		}
	}

	static toDto(entity: HouseRuleCategoryMapEntity): HouseRuleCategorymMapDto {
		return {
			houseRuleId: entity.house_rule_id,
			houseRuleCategoryId: entity.house_rule_category_id,
		}
	}
}
