import cleaningRepository from "./cleaning.repository"
import { RowDataPacket } from "mysql2"
import db from "@/config/database"

type Resident = {
	id: number
	name: string
}

type CleaningTask = {
	name: string
	assigneeId: number | null
}

type CleaningStateDto = {
	sectionId: number
	currentUserId: number
	residents: Resident[]
	dutyTemplate: string[]
	daysWithoutCleaning: string[]
	schedule: Record<string, CleaningTask[]>
}

const fallbackDutyTemplate = [
	"Kitchen",
	"Trash",
	"Living room",
	"Toilet A",
	"Toilet B",
]

class CleaningService {
	private parseStringArray(value: unknown, fallback: string[]): string[] {
		if (Array.isArray(value)) {
			return value.map((item) => String(item))
		}

		if (typeof value === "string") {
			try {
				const parsed = JSON.parse(value) as unknown
				if (Array.isArray(parsed)) {
					return parsed.map((item) => String(item))
				}
			} catch {
				// Backward compatibility for rows that were stored as comma separated text.
				return value
					.split(",")
					.map((item) => item.trim())
					.filter(Boolean)
			}
		}

		return fallback
	}

	private parseSchedule(
		value: unknown,
	): Record<string, { name: string; assigneeId: number | null }[]> {
		if (value && typeof value === "object") {
			return value as Record<
				string,
				{ name: string; assigneeId: number | null }[]
			>
		}
		if (typeof value === "string") {
			try {
				return JSON.parse(value) as Record<
					string,
					{ name: string; assigneeId: number | null }[]
				>
			} catch {
				return {}
			}
		}
		return {}
	}

	private async getResidentsBySectionId(
		sectionId: number,
	): Promise<Resident[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`
			SELECT u.id, CONCAT(u.first_name, ' ', u.last_name) AS name
			FROM section_user su
			INNER JOIN user u ON u.id = su.user_id
			WHERE su.section_id = ?
			GROUP BY u.id, u.first_name, u.last_name
			ORDER BY u.id ASC
			`,
			[sectionId],
		)

		return rows.map((row) => ({
			id: Number(row.id),
			name: String(row.name),
		}))
	}

	async getState(
		sectionId = 1,
		currentUserId = 1,
	): Promise<CleaningStateDto> {
		const state = await cleaningRepository.findBySectionId(sectionId)
		const residents = await this.getResidentsBySectionId(sectionId)

		if (!state) {
			return {
				sectionId,
				currentUserId,
				residents,
				dutyTemplate: fallbackDutyTemplate,
				daysWithoutCleaning: [],
				schedule: {},
			}
		}

		return {
			sectionId,
			currentUserId,
			residents,
			dutyTemplate: this.parseStringArray(
				state.duty_template,
				fallbackDutyTemplate,
			),
			daysWithoutCleaning: this.parseStringArray(
				state.days_without_cleaning,
				[],
			),
			schedule: this.parseSchedule(state.schedule) as Record<
				string,
				CleaningTask[]
			>,
		}
	}

	async saveState(payload: {
		sectionId: number
		dutyTemplate: string[]
		daysWithoutCleaning: string[]
		schedule: Record<string, CleaningTask[]>
	}) {
		await cleaningRepository.upsertState(
			payload.sectionId,
			payload.dutyTemplate,
			payload.daysWithoutCleaning,
			payload.schedule,
		)
	}
}

export default new CleaningService()
