import db from "@/config/database"
import AnnouncementEntity from "./types/announcement.entity"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { announcementTableName } from "@/utils/tableNames"

class AnnouncementRepository {
	async findAll(): Promise<AnnouncementEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${announcementTableName}`,
		)
		return rows.map((o) => o as AnnouncementEntity)
	}

	async findById(id: number): Promise<AnnouncementEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${announcementTableName} WHERE id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as AnnouncementEntity
	}

	async findByBuildingId(buildingId: number): Promise<AnnouncementEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${announcementTableName} WHERE building_id = ?`,
			[buildingId],
		)
		return rows.map((o) => o as AnnouncementEntity)
	}

	async create(announcement: AnnouncementEntity) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${announcementTableName} SET ?`,
			[announcement],
		)

		return result.insertId
	}

	async update(id: number, announcement: Partial<AnnouncementEntity>) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${announcementTableName} SET ? WHERE id = ?`,
			[announcement, id],
		)

		return result.affectedRows > 0
	}

	async delete(id: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${announcementTableName} WHERE id = ?`,
			[id],
		)

		return result.affectedRows > 0
	}
}

export default new AnnouncementRepository()
