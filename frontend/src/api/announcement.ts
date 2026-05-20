import envConfig from "@/config/env"
import AnnouncementDto from "@/shared/types/announcement/announcement.dto"
import axios from "axios"

class AnnouncementApi {
	path = `${envConfig.backend}announcement/`

	async getAll() {
		const { data } = await axios.get(this.path)
		return data as AnnouncementDto[]
	}

	async getByBuildingId(buildingId: number) {
		const { data } = await axios.get(`${this.path}building/${buildingId}`)
		return data as AnnouncementDto[]
	}
}

export default new AnnouncementApi()
