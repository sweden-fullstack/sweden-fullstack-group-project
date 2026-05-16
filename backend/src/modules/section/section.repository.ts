import db from "@/config/database"
import { RowDataPacket } from "mysql2"
import SectionEntity from "./types/section.entity"
import { sectionTableName } from "@/utils/tableNames"

class BuildingRepository {
	async findById(id: number): Promise<SectionEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${sectionTableName} WHERE id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as SectionEntity
	}
}

export default new BuildingRepository()
