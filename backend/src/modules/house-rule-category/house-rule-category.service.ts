import { Transaction } from "@/utils/transaction"
import HouseRuleCategorymMapDto from "@/shared/types/house-rule-category-map/houseRuleCategorymMap.dto"
import HouseRuleCategoryMapMapper from "@/modules/house-rule-category/types/houseRuleCategoryMap.mapper"
import HouseRuleCategoryMapEntity from "@/modules/house-rule-category/types/houseRuleCategoryMap.entity"
import houseRuleCategoryRepository from "@/modules/house-rule-category/house-rule-category.repository"
import BadRequestError from "@/errors/BadRequestError"

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
}

export default HouseRuleCategoryService
