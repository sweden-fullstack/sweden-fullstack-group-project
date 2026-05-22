import db from "@/config/database"
import HouseRuleCategoryMapEntity from "@/modules/house-rule-category/types/houseRuleCategoryMap.entity"
import { houseRuleCategoryMapTableName } from "@/utils/tableNames"
import { ResultSetHeader, RowDataPacket } from "mysql2"

class HouseRuleCategoryRepository {
	async create(houseRuleCategorMap: HouseRuleCategoryMapEntity) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${houseRuleCategoryMapTableName} SET ?`,
			[houseRuleCategorMap],
		)

		if (result.affectedRows === 0) return null
		return houseRuleCategorMap as HouseRuleCategoryMapEntity
	}

	async getById(houseRuleId: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${houseRuleCategoryMapTableName} WHERE ?`,
			[houseRuleId],
		)

		return rows.map((o) => o as HouseRuleCategoryMapEntity)
	}

	async update(
		houseRuleId: number,
		categoryId: number,
		newCategoryId: number,
	) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${houseRuleCategoryMapTableName} SET house_rule_category_id = ? WHERE house_rule_id = ? AND house_rule_category_id = ?`,
			[newCategoryId, houseRuleId, categoryId],
		)

		return result.affectedRows > 0
	}

	async delete(houseRuleId: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${houseRuleCategoryMapTableName} WHERE ?`,
			[houseRuleId],
		)

		return result.affectedRows > 0
	}
}

export default new HouseRuleCategoryRepository()
