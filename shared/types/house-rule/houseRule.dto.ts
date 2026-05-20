type HouseRuleDto = {
	id: number
	buildingId: number
	title: string
	body: string
	sortOrder: number
	updatedAt: string
	categoryIds: number[]
	categoryNames: string[]
}

export default HouseRuleDto
