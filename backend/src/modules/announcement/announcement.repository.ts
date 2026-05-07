import db from "@/config/database"
import AnnouncementEntity from "./types/announcement.entity"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import AnnouncementCreate from "@/shared/types/announcement/announcement.create"
import AnnouncementUpdate from "@/shared/types/announcement/announcement.update"

const tableName = "announcement"

class AnnouncementRepository {
	async findAll(): Promise<AnnouncementEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName}`,
		)
		return rows.map((o) => o as unknown as AnnouncementEntity)
	}

	async findById(id: number): Promise<AnnouncementEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName} WHERE id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as AnnouncementEntity
	}

	async findByBuildingId(buildingId: number): Promise<AnnouncementEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName} WHERE building_id = ?`,
			[buildingId],
		)
		return rows.map((o) => o as unknown as AnnouncementEntity)
	}

	async create(announcement: AnnouncementCreate) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${tableName} SET ?`,
			[announcement],
		)

		return result.insertId
	}

	async update(id: number, announcement: AnnouncementUpdate) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${tableName} SET ? WHERE id = ?`,
			[announcement, id],
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

export default new AnnouncementRepository()
