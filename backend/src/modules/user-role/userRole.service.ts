import { UserRoleDto } from "@/shared/types/user-role/userRole.dto"
import UserRoleMapper from "./types/userRole.mapper"
import userRoleRepository from "./userRole.repository"
import NotFoundError from "@/errors/NotFoundError"

class UserRoleService {
	async getAll(): Promise<UserRoleDto[]> {
		return (await userRoleRepository.findAll()).map((o) =>
			UserRoleMapper.toDto(o),
		)
	}

	async getById(id: number): Promise<UserRoleDto> {
		const user = await userRoleRepository.findById(id)

		if (!user) {
			throw new NotFoundError("User not found")
		}

		return UserRoleMapper.toDto(user)
	}
}

export default new UserRoleService()
