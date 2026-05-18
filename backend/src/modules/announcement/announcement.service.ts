import announcementRepository from "./announcement.repository"
import AnnouncementDto from "@/shared/types/announcement/announcement.dto"
import AnnouncementMapper from "./types/announcement.mapper"
import NotFoundError from "@/errors/NotFoundError"
import { Transaction } from "@/utils/transaction"
import AnnouncementCreate from "@/shared/types/announcement/announcement.create"
import AnnouncementUpdate from "@/shared/types/announcement/announcement.update"

class AnnouncementService {
	async getAll(): Promise<AnnouncementDto[]> {
		return (await announcementRepository.findAll()).map((o) =>
			AnnouncementMapper.toDto(o),
		)
	}

	async getById(id: number): Promise<AnnouncementDto> {
		const announcement = await announcementRepository.findById(id)

		if (!announcement) {
			throw new NotFoundError("Announcement not found")
		}

		return AnnouncementMapper.toDto(announcement)
	}

	async getByBuildingId(buildingId: number): Promise<AnnouncementDto[]> {
		return (await announcementRepository.findByBuildingId(buildingId)).map(
			(o) => AnnouncementMapper.toDto(o),
		)
	}

	async create(announcement: AnnouncementCreate): Promise<AnnouncementDto> {
		return await Transaction.run(async () => {
			const id = await announcementRepository.create(announcement)
			return await this.getById(id)
		})
	}

	async update(
		id: number,
		announcement: AnnouncementUpdate,
	): Promise<AnnouncementDto> {
		return await Transaction.run(async () => {
			await announcementRepository.update(id, announcement)
			return await this.getById(id)
		})
	}

	async delete(id: number): Promise<void> {
		const deleted = await announcementRepository.delete(id)
		if (!deleted) {
			throw new NotFoundError("Announcement not found")
		}
	}
}

export default new AnnouncementService()
