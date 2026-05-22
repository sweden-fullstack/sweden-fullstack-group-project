import envConfig from "@/config/env"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import axios from "axios"

class SectionUserApi {
	path = `${envConfig.backend}section_user/`

	async getSelfAuthenticated() {
		const { data } = await axios.get(`${this.path}self_authenticated`, {
			withCredentials: true,
		})

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
}

export default new SectionUserApi()
