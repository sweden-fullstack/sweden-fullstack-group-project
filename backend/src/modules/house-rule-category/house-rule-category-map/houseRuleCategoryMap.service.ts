import { Transaction } from "@/utils/transaction"
import HouseRuleCategoryMapDto from "../../../../../shared/types/house-rule-category-map/houseRuleCategoryMap.dto"
import HouseRuleCategoryMapMapper from "@/modules/house-rule-category/types/houseRuleCategoryMap.mapper"
import HouseRuleCategoryMapEntity from "@/modules/house-rule-category/types/houseRuleCategoryMap.entity"
import houseRuleCategoryRepository from "./houseRuleCategoryMap.repository"
import BadRequestError from "@/errors/BadRequestError"
import NotFoundError from "@/errors/NotFoundError"

class HouseRuleCategoryMapService {
	async create(
		dto: HouseRuleCategoryMapDto,
	): Promise<HouseRuleCategoryMapDto> {
		return await Transaction.run(async () => {
			const entity = HouseRuleCategoryMapMapper.toEntity(
				dto,
			) as HouseRuleCategoryMapEntity
			const houseRuleCategory =
				await houseRuleCategoryRepository.create(entity)

			if (!houseRuleCategory) {
				throw new BadRequestError()
			}

			return HouseRuleCategoryMapMapper.toDto(houseRuleCategory)
		})
	}

	async replaceCategories(
		houseRuleId: number,
		categoryIds: number[],
	): Promise<void> {
		return await Transaction.run(async () => {
			await houseRuleCategoryRepository.delete(houseRuleId)

			if (categoryIds.length > 0) {
				await Promise.all(
					categoryIds.map((categoryId) => {
						const entity: HouseRuleCategoryMapEntity = {
							house_rule_id: houseRuleId,
							house_rule_category_id: categoryId,
						}
						return houseRuleCategoryRepository.create(entity)
					}),
				)
			}
		})
	}

	async delete(houseRuleId: number): Promise<void> {
		const deleted = await houseRuleCategoryRepository.delete(houseRuleId)
		if (!deleted) {
			throw new NotFoundError("House Rule not found")
		}
	}
}

export default new HouseRuleCategoryMapService()
