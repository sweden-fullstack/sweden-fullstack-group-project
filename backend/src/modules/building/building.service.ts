import BuildingDto from "@/shared/types/building/building.dto"
import buildingRepository from "./building.repository"
import NotFoundError from "@/errors/NotFoundError"
import BuildingMapper from "./types/building.mapper"

class BuildingService {
	async getById(id: number): Promise<BuildingDto> {
		const user = await buildingRepository.findById(id)

		if (!user) {
			throw new NotFoundError("User not found")
		}

		return BuildingMapper.toDto(user)
	}
}

export default new BuildingService()
