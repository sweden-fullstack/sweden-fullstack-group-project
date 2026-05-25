import HouseRuleCategoryDto from "@/shared/types/house-rule-category/houseRuleCategory.dto"
import houseRuleCategoryRepository from "./houseRuleCategory.repository"
import HouseRuleCategoryMapper from "@/modules/house-rule-category/types/houseRuleCategory.mapper"

class HouseRuleCategoryService {
	async getAllCategories(): Promise<HouseRuleCategoryDto[]> {
		return (await houseRuleCategoryRepository.getCategories()).map((o) =>
			HouseRuleCategoryMapper.toDto(o),
		)
	}
}

export default new HouseRuleCategoryService()
