import SectionEntity from "@/modules/section/types/section.entity"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import db from "@/config/database"
import SectionCreate from "@/shared/types/section/section.create"
import SectionUpdate from "@/shared/types/section/section.update"

const tableName = "section"

class SectionRepository {
	async findAll(): Promise<SectionEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName}`,
		)
		return rows.map((o) => o as unknown as SectionEntity)
	}

	async findById(id: number): Promise<SectionEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName} WHERE id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as SectionEntity
	}

	async create(section: SectionCreate) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${tableName} SET ?`,
			[section],
		)

		return result.insertId
	}

	async update(id: number, section: SectionUpdate) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${tableName} SET ? WHERE id = ?`,
			[section, id],
		)

		return result.affectedRows > 0
	}

	async delete(id: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${tableName} WHERE id = ?`,
			[id],
		)

		return result.affectedRows > 0
	}
}

export default new SectionRepository()
