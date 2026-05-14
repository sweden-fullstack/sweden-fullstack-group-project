import db from "@/config/database"
import { RowDataPacket } from "mysql2"
import SectionUserEntity from "./types/sectionUser.entity"

export const tableName = "section_user"

class SectionUserRepository {
	async findByUserId(userId: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName}
         WHERE user_id = ?`,
			[userId],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as SectionUserEntity
	}
}

export default new SectionUserRepository()
