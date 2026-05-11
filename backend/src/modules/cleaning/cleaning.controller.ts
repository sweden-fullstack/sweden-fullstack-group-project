import { Request, Response } from "express"
import eventTypeRepository from "./cleaning.repository"
import SectionEventCleaningEntity from "./types/sectionEventCleaning.entity"
import sectionEventCleaningDto from "@/shared/types/section-event/sectionEventCleaning.dto"

class cleaningController {
	async getCleaningData(_req: Request, res: Response) {
		const rawRows: SectionEventCleaningEntity[] =
			await eventTypeRepository.getSectionEventCleaningData()

		const responseDtos: sectionEventCleaningDto[] = rawRows.map((row) => {
			return {
				id: row.id,
				sectionId: row.sectionId,
				eventType: row.eventType,
				startTime: row.startTime,
				endTime: row.endTime,
				description: row.description,
				users: row.users,
			}
		})

		return res.json(responseDtos)
	}
}

export default new cleaningController()
