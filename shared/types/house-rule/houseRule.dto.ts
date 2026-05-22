import houseRuleCategoryDto from "@/shared/types/house-rule-category/houseRuleCategory.dto"

type HouseRuleDto = {
	id: number
	buildingId: number
	title: string
	body: string
	sortOrder: number
	updatedAt: string
	categoryMap: houseRuleCategoryDto[]
}

export default HouseRuleDto
