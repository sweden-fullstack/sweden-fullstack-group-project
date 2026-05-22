import db from "backend/src/config/database"
import HouseRuleCategoryMapEntity from "backend/src/modules/house-rule-category/types/houseRuleCategoryMap.entity"
import { houseRuleCategoryMapTableName } from "backend/src/utils/tableNames"
import { ResultSetHeader, RowDataPacket } from "mysql2"

class HouseRuleCategoryMapRepository {
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

	async overrideCategoryMap(id: number, categoryId: number) {
		const deleted = await this.delete(id)
		if (!deleted) return null

		return await this.create({
			house_rule_id: id,
			house_rule_category_id: categoryId,
		} as HouseRuleCategoryMapEntity)
	}

	async delete(houseRuleId: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${houseRuleCategoryMapTableName} WHERE ?`,
			[houseRuleId],
		)

		return result.affectedRows > 0
	}
}

export default new HouseRuleCategoryMapRepository()
