import { UserRoleDto } from "@/shared/types/user-role/userRole.dto"
import UserRoleMapper from "./types/userRole.mapper"
import userRoleRepository from "./userRole.repository"
import NotFoundError from "@/errors/NotFoundError"

class UserRoleService {
	// The roles won't change so we can cache them
	userRolesCache?: UserRoleDto[]

	async getAll(): Promise<UserRoleDto[]> {
		if (!this.userRolesCache) {
			this.userRolesCache = (await userRoleRepository.findAll()).map(
				(o) => UserRoleMapper.toDto(o),
			)
		}

		return this.userRolesCache
	}

	async getById(id: number): Promise<UserRoleDto> {
		const role = await userRoleRepository.findById(id)

		if (!role) {
			throw new NotFoundError("Role not found")
		}

		return UserRoleMapper.toDto(role)
	}
}

export default new UserRoleService()
