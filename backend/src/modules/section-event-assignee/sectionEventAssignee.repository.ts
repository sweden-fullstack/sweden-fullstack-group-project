import db from "@/config/database"
import { RowDataPacket } from "mysql2"
import SectionUserEntity from "@/modules/section-user/types/sectionUser.entity"
import { Transaction } from "@/utils/transaction"

class SectionEventAssigneeRepository {
	async getAssigneesByEventId(eventId: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT u.id AS user_id, u.email, u.first_name, u.last_name, su.section_id
			FROM section_event_assignee a
			LEFT JOIN \`user\` u ON u.id = a.user_id
			LEFT JOIN section_user su ON su.user_id = u.id
			WHERE a.section_event_id = ?`,
			[eventId],
		)

		return rows as SectionUserEntity[]
	}

	async updateAssignees(sectionEventId: number, userIds: number[]) {
		return await Transaction.run(async () => {
			await db.query(
				`
			DELETE FROM section_event_assignee WHERE section_event_id = ?
			`,
				[sectionEventId],
			)

			if (userIds.length > 0) {
				const values = userIds.map((userId) => [userId, sectionEventId])
				await db.query(
					`INSERT INTO section_event_assignee (user_id, section_event_id) VALUES ?`,
					[values],
				)
			}
		})
	}
}
export default new SectionEventAssigneeRepository()
