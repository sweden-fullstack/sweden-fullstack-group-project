import db from "@/config/database"
import { RowDataPacket } from "mysql2"
import SectionUserEntity from "./types/sectionUser.entity"

const tableName = "section_user"

class SectionUserRepository {
	async findByUserIdAndSectionId(userId: number, sectionId: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName}
         WHERE user_id = ? AND section_id = ?`,
			[userId, sectionId],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as SectionUserEntity
	}
}

export default new SectionUserRepository()
