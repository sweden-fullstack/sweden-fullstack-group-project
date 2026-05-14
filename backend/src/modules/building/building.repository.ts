import BuildingEntity from "./types/building.entity"
import db from "@/config/database"
import { RowDataPacket } from "mysql2"

export const tableName = "building"

class BuildingRepository {
	async findById(id: number): Promise<BuildingEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName} WHERE id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as BuildingEntity
	}
}

export default new BuildingRepository()
