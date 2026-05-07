import { Request, Response } from "express"
import cleaningService from "./cleaning.service"

class CleaningController {
	async getState(_req: Request, res: Response) {
		try {
			const data = await cleaningService.getState()
			res.json(data)
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: "Internal server error" })
		}
	}

	async saveState(req: Request, res: Response) {
		try {
			const body = req.body as {
				sectionId?: number
				dutyTemplate?: string[]
				daysWithoutCleaning?: string[]
				schedule?: Record<
					string,
					{ name: string; assigneeId: number | null }[]
				>
			}

			if (
				!body.sectionId ||
				!Array.isArray(body.dutyTemplate) ||
				!Array.isArray(body.daysWithoutCleaning) ||
				typeof body.schedule !== "object" ||
				body.schedule === null
			) {
				return res.status(400).json({ error: "Invalid payload" })
			}

			await cleaningService.saveState({
				sectionId: body.sectionId,
				dutyTemplate: body.dutyTemplate,
				daysWithoutCleaning: body.daysWithoutCleaning,
				schedule: body.schedule,
			})

			return res.status(204).send()
		} catch (error) {
			console.error(error)
			return res.status(500).json({ error: "Internal server error" })
		}
	}
}

export default new CleaningController()
