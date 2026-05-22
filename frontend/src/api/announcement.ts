import axiosInstance from "@/config/axios"
import AnnouncementDto from "@/shared/types/announcement/announcement.dto"

class AnnouncementApi {
	path = `announcement/`

	async getAll() {
		const { data } = await axiosInstance.get(this.path)
		return data as AnnouncementDto[]
	}

	async getByBuildingId(buildingId?: number) {
		const { data } = await axiosInstance.get(
			`${this.path}building/${buildingId ?? ""}`,
		)
		return data as AnnouncementDto[]
	}
}

export default new AnnouncementApi()
