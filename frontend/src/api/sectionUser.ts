import axiosInstance from "@/config/axios"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"

class SectionUserApi {
	path = `section_user/`

	/**
	 * @param buildingId If undefined gets from token
	 */
	async getUsersByBuilding(buildingId?: number) {
		const { data } = await axiosInstance.get(
			`${this.path}/building/${buildingId}`,
		)

		return data as SectionUserDto[]
	}

	async getUsersBySecion(sectionId?: number) {
		const { data } = await axiosInstance.get(
			`${this.path}/section/${sectionId}`,
		)

		return data as SectionUserDto[]
	}

	async getSelfAuthenticated() {
		const { data } = await axiosInstance.get(
			`${this.path}self_authenticated`,
		)

		return data as SectionUserDto
	}
}

export default new SectionUserApi()
