import db from "@/config/database"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import SectionUserEntity from "./types/sectionUser.entity"

export const tableName = "section_user"

class SectionUserRepository {
	async findBySectionIdAndUserId(sectionId: number, userId: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName}
         WHERE user_id = ? AND section_id = ?`,
			[userId, sectionId],
		)

		if (rows.length === 0) return null
		return rows[0] as SectionUserEntity
	}

	async create(user: SectionUserEntity) {
		const [rows] = await db.query<RowDataPacket[]>(
			`INSERT INTO ${tableName} SET ?`,
			[user],
		)

		return rows[0] as SectionUserEntity
	}

	async update(
		sectionId: number,
		userId: number,
		user: Partial<SectionUserEntity>,
	) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${tableName} SET ? WHERE user_id = ? AND section_id = ?`,
			[user, userId, sectionId],
		)

		return result.affectedRows > 0
	}

	async delete(sectionId: number, userId: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${tableName} WHERE user_id = ? AND section_id = ?`,
			[userId, sectionId],
		)

		return result.affectedRows > 0
	}
}

export default new SectionUserRepository()
