import db from "@/config/database"
import SectionEventCleaningEntity from "./types/sectionEventCleaning.entity"
import { ResultSetHeader } from "mysql2"
import eventData from "@/modules/cleaning/types/eventData.entity"

class CleaningRepository {
	async create(sectionId: number, eventData_param: eventData) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO section_event SET ?`,
			[
				{
					section_id: sectionId,
					event_type_id: eventData_param.eventTypeId,
					description: eventData_param.description,
					start_time: eventData_param.startTime,
					end_time: eventData_param.endTime,
				},
			],
		)
		return result.insertId
	}

	async getBySection(
		sectionId: number,
	): Promise<SectionEventCleaningEntity[]> {
		const sql = `
            SELECT 
                e.id AS id, 
                e.section_id AS sectionId, 
                e.event_type_id AS eventType,
                e.description AS description,
                e.start_time AS startTime,
                e.end_time AS endTime,
                COALESCE(
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', u.id,
                            'email', u.email,
                            'firstName', u.first_name,
                            'lastName', u.last_name,
                            'sectionId', su.section_id
                        )
                    ),
                    JSON_ARRAY()
                ) AS users
            FROM section_event e
            LEFT JOIN section_event_assignee a ON e.id = a.section_event_id
            LEFT JOIN \`user\` u ON u.id = a.user_id
            LEFT JOIN section_user su ON su.user_id = u.id
            WHERE e.section_id = ?
            GROUP BY e.id, e.section_id, e.event_type_id, e.description, e.start_time, e.end_time
        `

		const [rows] = await db.query(sql, [sectionId])
		return rows as unknown as SectionEventCleaningEntity[]
	}

	async updateAssignees(sectionEventId: number, userIds: number[]) {
		await db.query(
			`
			DELETE FROM section_event_assignee WHERE section_event_id = ?
			`,
			[sectionEventId],
		)

		for (const userId of userIds) {
			await db.query(
				`INSERT INTO section_event_assignee (user_id, section_event_id) VALUES (?, ?)`,
				[userId, sectionEventId],
			)
		}
	}

	async deleteSectionEventCleaningData(eventId: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM section_event WHERE id = ?`,
			[eventId],
		)
		return result.affectedRows > 0
	}
}

export default new CleaningRepository()
