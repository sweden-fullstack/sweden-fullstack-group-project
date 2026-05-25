import axiosInstance from "@/config/axios"
import SectionDto from "@/shared/types/section/section.dto"

class SectionApi {
	path = "section"

	/**
	 * @param sectionId if undefined gets from jwt token
	 */
	async getById(sectionId?: number): Promise<SectionDto> {
		const { data } = await axiosInstance.get<SectionDto>(
			`${this.path}/${sectionId ?? ""}`,
		)
		return data
	}

	async getAllByBuildingId(buildingId?: number): Promise<SectionDto[]> {
		const { data } = await axiosInstance.get<SectionDto[]>(
			`${this.path}/building_id/${buildingId ?? ""}`,
		)
		return data
	}
}

export default new SectionApi()
