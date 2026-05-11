import db from "@/config/database"
import SectionEventCleaningEntity from "./types/sectionEventCleaning.entity"

class CleaningRepository {
	async getSectionEventCleaningData(): Promise<SectionEventCleaningEntity[]> {
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
            GROUP BY e.id, e.section_id, e.event_type_id, e.description, e.start_time, e.end_time
        `

		const [rows] = await db.query(sql)
		return rows as unknown as SectionEventCleaningEntity[]
	}
}

export default new CleaningRepository()
