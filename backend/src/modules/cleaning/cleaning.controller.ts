import { Request, Response } from "express"
import SectionEventCleaningEntity from "./types/sectionEventCleaning.entity"
import sectionEventCleaningDto from "@/shared/types/section-event/sectionEventCleaning.dto"
import cleaningRepository from "./cleaning.repository"
import typia from "typia"

class cleaningController {
	async create(req: Request, res: Response) {
		const { sectionId, startTime, endTime, description } = req.body

		const eventId = await cleaningRepository.create(sectionId, {
			eventTypeId: 2, // Cleaning type ID
			description,
			startTime,
			endTime,
		})

		const event = await cleaningRepository.getBySection(sectionId)
		const created = event.find((e) => e.id === eventId)

		return res.status(201).json(created)
	}

	async update(req: Request, res: Response) {
		const eventId = typia.assert<number>(
			parseInt(req.params.sectionEventId as string),
		)
		const { users } = req.body
		const userIds = users.map((u: { id: number }) => u.id)

		await cleaningRepository.updateAssignees(eventId, userIds)

		return res.json({ success: true })
	}

	async getBySection(req: Request, res: Response) {
		const sectionId = typia.assert<number>(
			parseInt(req.params.sectionId as string),
		)
		const rawRows: SectionEventCleaningEntity[] =
			await cleaningRepository.getBySection(sectionId)

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

	async delete(req: Request, res: Response) {
		const eventId = typia.assert<number>(
			parseInt(req.params.eventId as string),
		)
		await cleaningRepository.deleteSectionEventCleaningData(eventId)
		return res.status(204).send()
	}
}

export default new cleaningController()
