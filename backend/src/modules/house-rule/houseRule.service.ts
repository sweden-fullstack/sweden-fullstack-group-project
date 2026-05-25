import NotFoundError from "@/errors/NotFoundError"
import { Transaction } from "@/utils/transaction"
import houseRuleRepository from "./houseRule.repository"
import HouseRuleMapper from "./types/houseRule.mapper"
import HouseRuleDto from "@/shared/types/house-rule/houseRule.dto"
import HouseRuleCreate from "@/shared/types/house-rule/houseRule.create"
import HouseRuleEntity from "./types/houseRule.entity"
import HouseRuleUpdate from "@/shared/types/house-rule/houseRule.update"
import houseRuleCategoryService from "../house-rule-category/house-rule-category-map/houseRuleCategoryMap.service"
import houseRuleCategoryRepository from "../house-rule-category/house-rule-category-map/houseRuleCategoryMap.repository"
import BadRequestError from "@/errors/BadRequestError"

class HouseRuleService {
	async getAllByBuildingId(buildingId: number): Promise<HouseRuleDto[]> {
		return await Transaction.run(async () => {
			const entities =
				await houseRuleRepository.findAllByBuildingId(buildingId)

			return await Promise.all(
				entities.map(async (entity) => {
					entity.category_map =
						await houseRuleCategoryRepository.getById(entity.id)

					return HouseRuleMapper.toDto(entity)
				}),
			)
		})
	}

	async getById(id: number): Promise<HouseRuleDto> {
		return await Transaction.run(async () => {
			const entity = await houseRuleRepository.findById(id)

			if (!entity) {
				throw new NotFoundError("House Rule not found")
			}

			entity.category_map = await houseRuleCategoryRepository.getById(id)

			return HouseRuleMapper.toDto(entity)
		})
	}

	async create(dto: HouseRuleCreate): Promise<HouseRuleDto> {
		return await Transaction.run(async () => {
			const entity = HouseRuleMapper.toEntity(dto) as HouseRuleEntity
			const id = await houseRuleRepository.create(entity)

			if (dto.categoryIds.length > 0) {
				await Promise.all(
					dto.categoryIds.map((categoryId) =>
						houseRuleCategoryService.create({
							houseRuleId: id,
							houseRuleCategoryId: categoryId,
						}),
					),
				)
			} else {
				throw new BadRequestError(
					"A house rule always needs a category",
				)
			}

			return await this.getById(id)
		})
	}

	async update(id: number, dto: HouseRuleUpdate): Promise<HouseRuleDto> {
		return await Transaction.run(async () => {
			const entity = HouseRuleMapper.toEntity(dto)
			await houseRuleRepository.update(id, entity)

			if (dto.categoryIds !== undefined) {
				await houseRuleCategoryService.replaceCategories(
					id,
					dto.categoryIds,
				)
			}

			return await this.getById(id)
		})
	}

	async delete(id: number): Promise<void> {
		return await Transaction.run(async () => {
			await houseRuleCategoryRepository.delete(id)

			const deleted = await houseRuleRepository.delete(id)
			if (!deleted) {
				throw new NotFoundError("House Rule not found")
			}
		})
	}
}

export default new HouseRuleService()
