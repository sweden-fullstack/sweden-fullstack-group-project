import db from "@/config/database"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { sectionEventTableName } from "@/utils/tableNames"
import SectionEventEntity from "@/modules/section-event/types/sectionEvent.entity"
import NotFoundError from "@/errors/NotFoundError"

class SectionEventRepository {
	async create(eventData_param: SectionEventEntity) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${sectionEventTableName} SET ?`,
			[eventData_param],
		)

		return result.insertId
	}

	async getEventBySection(sectionId: number): Promise<SectionEventEntity[]> {
		const [rows] = await db.query(
			`SELECT *
		FROM ${sectionEventTableName}
		WHERE section_id = ?`,
			[sectionId],
		)
		return rows as SectionEventEntity[]
	}

	async getEventById(id: number): Promise<SectionEventEntity> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${sectionEventTableName}
				WHERE id = ?`,
			[id],
		)
		if (rows.length === 0) {
			throw new NotFoundError(`No section event found with id ${id}`)
		}
		return (rows as SectionEventEntity[])[0]
	}

	async deleteSectionEvent(eventId: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${sectionEventTableName} WHERE id = ?`,
			[eventId],
		)
		return result.affectedRows > 0
	}
}

export default new SectionEventRepository()
