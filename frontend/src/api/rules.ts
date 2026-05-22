import HouseRuleCreate from "@/shared/types/house-rule/houseRule.create"
import HouseRuleDto from "@/shared/types/house-rule/houseRule.dto"
import HouseRuleUpdate from "@/shared/types/house-rule/houseRule.update"

import HouseRuleCategoryDto from "@/shared/types/house-rule-category/houseRuleCategory.dto"

const categories: HouseRuleCategoryDto[] = [
	{ id: 1, name: "General" },
	{ id: 2, name: "Noise" },
	{ id: 3, name: "Safety" },
	{ id: 4, name: "Cleaning" },
]

function resolveCategoryMap(categoryIds: number[]): HouseRuleCategoryDto[] {
	return categoryIds
		.map((id) => categories.find((c) => c.id === id))
		.filter((category): category is HouseRuleCategoryDto =>
			Boolean(category),
		)
		.map((category) => ({ ...category }))
}

let rules: HouseRuleDto[] = [
	{
		id: 1,
		buildingId: 1,
		title: "No smoking",
		body: "Smoking is not allowed indoors.",
		sortOrder: 1,
		updatedAt: "2026-05-01",
		categoryMap: resolveCategoryMap([1, 3]),
	},
	{
		id: 2,
		buildingId: 1,
		title: "Respect quiet hours",
		body: "Keep noise down at night.",
		sortOrder: 2,
		updatedAt: "2026-05-01",
		categoryMap: resolveCategoryMap([2]),
	},
	{
		id: 3,
		buildingId: 1,
		title: "Clean shared kitchen",
		body: "Leave the kitchen as you found it.",
		sortOrder: 3,
		updatedAt: "2026-05-01",
		categoryMap: resolveCategoryMap([4]),
	},
	{
		id: 4,
		buildingId: 2,
		title: "Sort your trash",
		body: "Use the correct bins for recycling.",
		sortOrder: 1,
		updatedAt: "2026-05-01",
		categoryMap: resolveCategoryMap([1]),
	},
]

let nextRuleId = rules.reduce((max, rule) => Math.max(max, rule.id), 0) + 1

function todayIsoDate(): string {
	return new Date().toISOString().slice(0, 10)
}

class RulesApi {
	async getCategories() {
		// Later: return axios.get<HouseRuleCategoryDto[]>("/house-rule/categories").then((res) => res.data)
		return categories.map((c) => ({ ...c }))
	}

	async getByBuilding(buildingId: number) {
		// Later: return axios.get<HouseRuleDto[]>(`/house-rule?buildingId=${buildingId}`).then((res) => res.data)
		return rules
			.filter((rule) => rule.buildingId === buildingId)
			.sort((a, b) => a.sortOrder - b.sortOrder)
			.map((rule) => ({
				...rule,
				categoryMap: rule.categoryMap.map((category) => ({
					...category,
				})),
			}))
	}

	async create(payload: HouseRuleCreate) {
		// Later: return axios.post<HouseRuleDto>("/house-rule", payload).then((res) => res.data)
		const rule: HouseRuleDto = {
			id: nextRuleId++,
			buildingId: payload.buildingId,
			title: payload.title,
			body: payload.body,
			sortOrder: payload.sortOrder,
			updatedAt: todayIsoDate(),
			categoryMap: resolveCategoryMap(payload.categoryIds),
		}
		rules.push(rule)
		return { ...rule }
	}

	async update(id: number, payload: HouseRuleUpdate) {
		// Later: return axios.put<HouseRuleDto>(`/house-rule/${id}`, payload).then((res) => res.data)
		const index = rules.findIndex((rule) => rule.id === id)
		if (index < 0) {
			throw new Error(`House rule ${id} not found`)
		}
		const updated: HouseRuleDto = {
			...rules[index],
			title: payload.title,
			body: payload.body,
			sortOrder: payload.sortOrder,
			updatedAt: todayIsoDate(),
			categoryMap: resolveCategoryMap(payload.categoryIds),
		}
		rules[index] = updated
		return { ...updated }
	}

	async delete(id: number) {
		// Later: await axios.delete(`/house-rule/${id}`)
		rules = rules.filter((rule) => rule.id !== id)
	}
}

export default new RulesApi()
