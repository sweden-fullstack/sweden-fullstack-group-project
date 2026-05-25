import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"
import SectionEventDto from "@/shared/types/section-event/sectionEvent.dto"
import axiosInstance from "@/config/axios"
import SectionEventUpdate from "@/shared/types/section-event/sectionEvent.update"

class SectionEventApi {
	path = "section_event"

	async getAllByBuildingId(buildingId?: number) {
		const { data } = await axiosInstance.get<SectionEventDto[]>(
			`${this.path}/building_id/${buildingId ?? ""}`,
		)

		return data
	}

	async create(
		dto: SectionEventCreate,
		sectionId?: number,
	): Promise<SectionEventDto> {
		const { data } = await axiosInstance.post<SectionEventDto>(
			`${this.path}/section_id/${sectionId ?? ""}`,
			dto,
		)
		return data
	}

	async update(
		dto: SectionEventUpdate,
		id?: number,
	): Promise<SectionEventDto> {
		const { data } = await axiosInstance.put<SectionEventDto>(
			`${this.path}/${id ?? ""}`,
			dto,
		)
		return data
	}

	async delete(id: number): Promise<void> {
		await axiosInstance.delete(`${this.path}/${id}`)
	}
}

export default new SectionEventApi()
