import HouseRuleCategoryMapDto from "@/shared/types/house-rule-category-map/houseRuleCategoryMap.dto"

type HouseRuleDto = {
	id: number
	buildingId: number
	title: string
	body: string
	sortOrder: number //Maybe just sort by name since this is too painful to implement?
	updatedAt: Date
	categoryMap: HouseRuleCategoryMapDto[]
}

export default HouseRuleDto
