import HouseRuleCategoryMapEntity from "@/modules/house-rule-category/types/houseRuleCategoryMap.entity"

type HouseRuleEntity = {
	id: number
	building_id: number
	title: string
	body: string
	sort_order: number
	updated_at: Date
	category_map: HouseRuleCategoryMapEntity[]
}

export default HouseRuleEntity
