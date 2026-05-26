import axiosInstance from "@/config/axios"
import SectionUserCreate from "@/shared/types/section-user/sectionUser.create"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"

class SectionUserApi {
	path = `section_user`

	/**
	 * @param buildingId If undefined gets from token
	 */
	async getUsersByBuilding(buildingId?: number) {
		const { data } = await axiosInstance.get(
			`${this.path}/building/${buildingId ?? ""}`,
		)

		return data as SectionUserDto[]
	}

	async getUsersBySection(sectionId?: number) {
		const { data } = await axiosInstance.get(
			`${this.path}/section/${sectionId ?? ""}`,
		)

		return data as SectionUserDto[]
	}

	async getSelfAuthenticated() {
		const { data } = await axiosInstance.get(
			`${this.path}/self_authenticated`,
		)

		return data as SectionUserDto
	}

	async create(sectionId: number, user: SectionUserCreate) {
		const { data } = await axiosInstance.post(
			`${this.path}/user_to_section/section_id/${sectionId}`,
			user,
		)

		return data as SectionUserDto
	}
}

export default new SectionUserApi()
