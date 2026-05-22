import { Request, Response } from "express"
import announcementService from "./announcement.service"
import AnnouncementUpdate from "@/shared/types/announcement/announcement.update"
import AnnouncementCreate from "@/shared/types/announcement/announcement.create"
import typia from "typia"
import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"

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
		const jwt = req.user as JwtPayloadExtended
		const buildingIdString = req.params.buildingId
			? req.params.buildingId
			: jwt.buildingId
		const buildingId = parseInt(buildingIdString as string)

		const announcements =
			await announcementService.getByBuildingId(buildingId)
		res.json(announcements)
	}

	async create(req: Request, res: Response) {
		const body = typia.assertEquals<AnnouncementCreate>(req.body)
		const newAnnouncement = await announcementService.create(body)

		res.status(201).json(newAnnouncement)
	}

	async update(req: Request, res: Response) {
		const id = parseInt(req.params.id as string)
		const body = typia.assertEquals<AnnouncementUpdate>(req.body)

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
