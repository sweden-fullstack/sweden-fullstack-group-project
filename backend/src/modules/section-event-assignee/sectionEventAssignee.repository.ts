import db from "@/config/database"
import { Transaction } from "@/utils/transaction"

class SectionEventAssigneeRepository {
	async overrideAssignees(sectionEventId: number, userIds: number[]) {
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
