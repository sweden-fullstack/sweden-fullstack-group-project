import AnnouncementDto from "@/shared/types/announcement/announcement.dto"
import AnnouncementEntity from "./announcement.entity"

export default class AnnouncementMapper {
	static toEntity(
		dto: Partial<AnnouncementDto>,
	): Partial<AnnouncementEntity> {
		const entity: Partial<AnnouncementEntity> = {}

		if (dto.id !== undefined) {
			entity.id = dto.id
		}

		if (dto.building_id !== undefined) {
			entity.building_id = dto.building_id
		}

		if (dto.title !== undefined) {
			entity.title = dto.title
		}

		if (dto.meta !== undefined) {
			entity.meta = dto.meta
		}

		if (dto.body !== undefined) {
			entity.body = dto.body
		}

		return entity
	}

	static toDto(entity: AnnouncementEntity): AnnouncementDto {
		return {
			id: entity.id,
			building_id: entity.building_id,
			title: entity.title,
			meta: entity.meta,
			body: entity.body,
		}
	}
}
