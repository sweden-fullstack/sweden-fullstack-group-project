import db from "@/config/database"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import CleaningEntity from "./types/cleaning.entity"

const tableName = "section_cleaning_state"

class CleaningRepository {
	async findBySectionId(sectionId: number): Promise<CleaningEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT section_id, duty_template, days_without_cleaning, schedule FROM ${tableName} WHERE section_id = ? LIMIT 1`,
			[sectionId],
		)

		if (rows.length === 0) {
			return null
		}

		return rows[0] as unknown as CleaningEntity
	}

	async upsertState(
		sectionId: number,
		dutyTemplate: string[],
		daysWithoutCleaning: string[],
		schedule: Record<string, { name: string; assigneeId: number | null }[]>,
	) {
		const query = `
			INSERT INTO ${tableName} (section_id, duty_template, days_without_cleaning, schedule)
			VALUES (?, CAST(? AS JSON), CAST(? AS JSON), CAST(? AS JSON))
			ON DUPLICATE KEY UPDATE
				duty_template = VALUES(duty_template),
				days_without_cleaning = VALUES(days_without_cleaning),
				schedule = VALUES(schedule)
		`

		await db.query<ResultSetHeader>(query, [
			sectionId,
			JSON.stringify(dutyTemplate),
			JSON.stringify(daysWithoutCleaning),
			JSON.stringify(schedule),
		])
	}
}

export default new CleaningRepository()
