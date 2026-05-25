import HouseRuleCreate from "@/shared/types/house-rule/houseRule.create"
import HouseRuleDto from "@/shared/types/house-rule/houseRule.dto"
import HouseRuleUpdate from "@/shared/types/house-rule/houseRule.update"

import HouseRuleCategoryDto from "@/shared/types/house-rule-category/houseRuleCategory.dto"
import axiosInstance from "@/config/axios"

class RulesApi {
	houseRuleCategorypath = `house_rule_category/`
	houseRulePath = `house_rule/`

	async getCategories() {
		const { data } = await axiosInstance.get(this.houseRuleCategorypath)
		return data as HouseRuleCategoryDto[]
	}

	async getByBuilding() {
		const { data } = await axiosInstance.get(
			`${this.houseRulePath}by_building`,
		)
		return data as HouseRuleDto[]
	}

	async create(payload: HouseRuleCreate) {
		const { data } = await axiosInstance.post(`${this.houseRulePath}`, {
			buildingId: payload.buildingId,
			title: payload.title,
			body: payload.body,
			sortOrder: payload.sortOrder,
			categoryIds: payload.categoryIds,
		})
		return data
	}

	async update(id: number, payload: HouseRuleUpdate) {
		const { data } = await axiosInstance.put(`${this.houseRulePath}${id}`, {
			title: payload.title,
			body: payload.body,
			sortOrder: payload.sortOrder,
			categoryIds: payload.categoryIds,
		})
		return data
	}

	async delete(id: number) {
		await axiosInstance.delete(`${this.houseRulePath}${id}`)
	}
}

export default new RulesApi()
