import axiosInstance from "@/config/axios"
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

	async getUsersBySecion(sectionId?: number) {
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

	async getByBuildingId(buildingId: number) {
		const { data } = await axios.get(`${this.path}building/${buildingId}`, {
			withCredentials: true,
		})

		return data as SectionUserDto[]
	}

	async getBySectionId(sectionId: number) {
		const { data } = await axios.get(`${this.path}section/${sectionId}`, {
			withCredentials: true,
		})

		return data as SectionUserDto[]
	}

	async create(sectionId: number, user: SectionUserCreate) {
		const { data } = await axios.post(
			`${this.path}user_to_section/section_id/${sectionId}`,
			user,
			{
				withCredentials: true,
			},
		)

		return data as SectionUserDto
	}
}

export default new SectionUserApi()
