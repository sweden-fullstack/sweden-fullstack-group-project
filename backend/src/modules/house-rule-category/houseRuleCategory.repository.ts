import HouseRuleCategoryEntity from "@/modules/house-rule-category/types/houseRuleCategory.entity"
import db from "@/config/database"
import { houseRoleCategoryTableName } from "@/utils/tableNames"
import { RowDataPacket } from "mysql2"

class HouseRuleCategoryRepository {
	async getCategories() {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${houseRoleCategoryTableName}`,
		)

		return rows.map((o) => o as HouseRuleCategoryEntity)
	}
}

export default new HouseRuleCategoryRepository()
