import SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"
import SectionEventEntity from "@/modules/section-event/types/sectionEvent.entity"
import { removeUndefined } from "@/utils/mapper"

export default class SectionEventMapper {
	static toEntity(
		dto: Partial<SectionEventDto>,
	): Partial<SectionEventEntity> {
		return removeUndefined({
			title: dto.title,
			building_id: dto.buidingId,
			event_type_id: dto.eventTypeId,
			description: dto.description,
			start_time: dto.startTime,
			end_time: dto.endTime,
			section_id: dto.sectionId,
		})
	}

	static toDto(entity: SectionEventEntity): SectionEventDto {
		return {
			id: entity.id,
			eventTypeId: entity.event_type_id,
			title: entity.title,
			description: entity.description,
			startTime: entity.start_time,
			endTime: entity.end_time,
			sectionId: entity.section_id,
			buidingId: entity.building_id,

			// Must be mapped manually
			users: undefined,
		}
	}
}
