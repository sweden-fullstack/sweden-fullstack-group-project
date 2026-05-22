import { Transaction } from "@/utils/transaction"
import HouseRuleCategorymMapDto from "@/shared/types/house-rule-category-map/houseRuleCategorymMap.dto"
import HouseRuleCategoryMapMapper from "@/modules/house-rule-category/types/houseRuleCategoryMap.mapper"
import HouseRuleCategoryMapEntity from "@/modules/house-rule-category/types/houseRuleCategoryMap.entity"
import houseRuleCategoryRepository from "@/modules/house-rule-category/house-rule-category.repository"
import BadRequestError from "@/errors/BadRequestError"
import NotFoundError from "@/errors/NotFoundError"

class HouseRuleCategoryService {
	async create(
		dto: HouseRuleCategorymMapDto,
	): Promise<HouseRuleCategorymMapDto> {
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

	async getById(houseRuleId: number) {
		return (await houseRuleCategoryRepository.getById(houseRuleId)).map(
			(o) => HouseRuleCategoryMapMapper.toDto(o),
		)
	}

	async update(
		houseRuleId: number,
		categoryId: number,
		newCategoryId: number,
	): Promise<HouseRuleCategorymMapDto> {
		return await Transaction.run(async () => {
			const success = await houseRuleCategoryRepository.update(
				houseRuleId,
				categoryId,
				newCategoryId,
			)

			if (!success) {
				throw new BadRequestError(
					"House rule category not found or update failed",
				)
			}

			const entity: HouseRuleCategoryMapEntity = {
				house_rule_id: houseRuleId,
				house_rule_category_id: newCategoryId,
			}

			return HouseRuleCategoryMapMapper.toDto(entity)
		})
	}

	async delete(houseRuleId: number): Promise<void> {
		const deleted = await houseRuleCategoryRepository.delete(houseRuleId)
		if (!deleted) {
			throw new NotFoundError("House Rule not found")
		}
	}
}

export default new HouseRuleCategoryService()
