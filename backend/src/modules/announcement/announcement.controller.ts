import { Request, Response } from "express"
import announcementService from "./announcement.service"
import AnnouncementUpdate from "@/shared/types/announcement/announcement.update"
import AnnouncementCreate from "@/shared/types/announcement/announcement.create"

class AnnouncementController {
	async getAll(_req: Request, res: Response) {
		const announcements = await announcementService.getAll()
		res.json(announcements)
	}

	async getById(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)

		const announcement = await announcementService.getById(id)
		res.json(announcement)
	}

	async getByBuildingId(req: Request, res: Response) {
		const buildingId = parseInt(req.params.buildingId as string)

		const announcements =
			await announcementService.getByBuildingId(buildingId)
		res.json(announcements)
	}

	async create(req: Request, res: Response) {
		const body = req.body as AnnouncementCreate
		const newAnnouncement = await announcementService.create(body)

		res.status(201).json(newAnnouncement)
	}

	async update(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)
		const body = req.body as AnnouncementUpdate

		const updatedAnnouncement = await announcementService.update(id, body)
		return res.status(200).json(updatedAnnouncement)
	}

	async delete(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)

		await announcementService.delete(id)
		return res.status(204).send()
	}
}

export default new AnnouncementController()
