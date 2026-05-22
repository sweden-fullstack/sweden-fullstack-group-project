import NotFoundError from "@/errors/NotFoundError"
import { Transaction } from "@/utils/transaction"
import houseRuleRepository from "./houseRule.repository"
import HouseRuleMapper from "./types/houseRule.mapper"
import HouseRuleDto from "@/shared/types/house-rule/houseRule.dto"
import HouseRuleCreate from "@/shared/types/house-rule/houseRule.create"
import HouseRuleEntity from "./types/houseRule.entity"
import HouseRuleUpdate from "@/shared/types/house-rule/houseRule.update"
import houseRuleCategoryService from "@/modules/house-rule-category/house-rule-category.service"

class HouseRuleService {
	async getAllByBuildingId(buildingId: number): Promise<HouseRuleDto[]> {
		return (await houseRuleRepository.findAllByBuildingId(buildingId)).map(
			(o) => HouseRuleMapper.toDto(o),
		)
	}

	async getById(id: number): Promise<HouseRuleDto> {
		const entity = await houseRuleRepository.findById(id)
		const categoryIds = await houseRuleCategoryService.getById(id)

		entity.category_ids = categoryIds

		if (!entity) {
			throw new NotFoundError("House Rule not found")
		}

		return HouseRuleMapper.toDto(entity)
	}

	async create(dto: HouseRuleCreate): Promise<HouseRuleDto> {
		return await Transaction.run(async () => {
			const entity = HouseRuleMapper.toEntity(dto) as HouseRuleEntity
			const id = await houseRuleRepository.create(entity)
			return await this.getById(id)
		})
	}

	async update(id: number, dto: HouseRuleUpdate): Promise<HouseRuleDto> {
		return await Transaction.run(async () => {
			const entity = HouseRuleMapper.toEntity(dto)
			await houseRuleRepository.update(id, entity)
			return await this.getById(id)
		})
	}

	async delete(id: number): Promise<void> {
		const deleted = await houseRuleRepository.delete(id)
		if (!deleted) {
			throw new NotFoundError("House Rule not found")
		}
	}
}

export default new HouseRuleService()
