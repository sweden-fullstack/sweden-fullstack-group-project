type HouseRuleDto = {
	id: number
	buildingId: number
	title: string
	body: string
	sortOrder: number //Maybe just sort by name since this is too painful to implement?
	updatedAt: Date
}

export default HouseRuleDto
