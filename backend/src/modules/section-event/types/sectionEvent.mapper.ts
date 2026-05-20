import SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"
import SectionEventEntity from "@/modules/section-event/types/sectionEvent.entity"
import { removeUndefined } from "@/utils/mapper"
import SectionUserMapper from "@/modules/section-user/types/sectionUser.mapper"

export default class SectionEventMapper {
	static toEntity(
		dto: Partial<SectionEventDto>,
	): Partial<SectionEventEntity> {
		return removeUndefined({
			event_type_id: dto.eventTypeId,
			title: dto.title,
			description: dto.description,
			start_time: dto.startTime,
			end_time: dto.endTime,
			section_id: dto.sectionId,
			building_id: dto.buidingId,
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

			// mapped joins
			...(entity.users && {
				users: entity.users.map((u) => SectionUserMapper.toDto(u)),
			}),
		}
	}
}
