import db from "@/config/database"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { houseRuleTableName } from "@/utils/tableNames"
import HouseRuleEntity from "./types/houseRule.entity"

class HouseRuleRepository {
	async findAllByBuildingId(buildingId: number): Promise<HouseRuleEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${houseRuleTableName} 
               WHERE building_id = ?`,
			[buildingId],
		)
		return rows.map((o) => o as HouseRuleEntity)
	}

	async findById(id: number): Promise<HouseRuleEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${houseRuleTableName} WHERE id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as HouseRuleEntity
	}

	async create(houseRule: HouseRuleEntity) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${houseRuleTableName} SET ?`,
			[houseRule],
		)

		return result.insertId
	}

	async update(id: number, houseRule: Partial<HouseRuleEntity>) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${houseRuleTableName} SET ? WHERE id = ?`,
			[houseRule, id],
		)

		return result.affectedRows > 0
	}

	async delete(id: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${houseRuleTableName} WHERE id = ?`,
			[id],
		)

		return result.affectedRows > 0
	}
}

export default new HouseRuleRepository()
