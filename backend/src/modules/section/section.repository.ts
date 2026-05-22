import db from "@/config/database"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import SectionEntity from "./types/section.entity"
import { buildingTableName, sectionTableName } from "@/utils/tableNames"

class SectionRepository {
	selectQueryBase = `SELECT s.*, b.name as building_name FROM ${sectionTableName} s
      INNER JOIN ${buildingTableName} b ON s.building_id = b.id
`
	async findAll(): Promise<SectionEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(this.selectQueryBase)
		return rows.map((o) => o as SectionEntity)
	}

	async findAllByBuildingId(buildingId: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`${this.selectQueryBase} WHERE s.building_id = ?`,
			[buildingId],
		)
		return rows.map((o) => o as SectionEntity)
	}

	async findById(id: number): Promise<SectionEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`${this.selectQueryBase} WHERE s.id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as SectionEntity
	}

	async create(section: SectionEntity) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${sectionTableName} SET ?`,
			[section],
		)

		return result.insertId
	}

	async update(id: number, section: Partial<SectionEntity>) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${sectionTableName} SET ? WHERE id = ?`,
			[section, id],
		)

		return result.affectedRows > 0
	}

	async delete(id: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${sectionTableName} WHERE id = ?`,
			[id],
		)

		return result.affectedRows > 0
	}
}

export default new SectionRepository()
