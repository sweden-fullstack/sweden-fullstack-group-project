import typia from "typia"
import userRepository from "./user.repository"
import UserDto from "@/shared/types/user/user.dto"
import UserCreate from "@/shared/types/user/user.create"
import UserUpdate from "@/shared/types/user/user.update"

class UserService {
	async getAllUsers(): Promise<UserDto[]> {
		return (await userRepository.findAll()).map((o) =>
			typia.misc.assertPrune<UserDto>(o),
		)
	}

	async getUserByUsername(username: string): Promise<UserDto> {
		const user = await userRepository.findByUsername(username)
		if (!user) {
			throw new Error("User not found")
		}
		return typia.misc.assertPrune<UserDto>(user)
	}

	async createUser(user: UserCreate): Promise<UserDto> {
		const newUsername = await userRepository.create(user)
		return await this.getUserByUsername(newUsername)
	}

	async updateUser(username: string, user: UserUpdate): Promise<UserDto> {
		const updated = await userRepository.update(username, user)
		if (!updated) {
			throw new Error("User not found or no changes applied")
		}

		return await this.getUserByUsername(user.username)
	}

	async deleteUser(username: string): Promise<void> {
		const deleted = await userRepository.delete(username)
		if (!deleted) {
			throw new Error("User not found")
		}
	}
}

export default new UserService()
