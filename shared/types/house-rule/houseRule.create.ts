type HouseRuleCreate = {
	buildingId: number
	title: string
	body: string
	sortOrder: number
	categoryIds: number[]
}

export default HouseRuleCreate
