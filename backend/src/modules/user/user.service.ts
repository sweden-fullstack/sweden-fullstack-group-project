import userRepository from "./user.repository"
import UserDto from "@/shared/types/user/user.dto"
import UserCreate from "@/shared/types/user/user.create"
import UserUpdate from "@/shared/types/user/user.update"
import UserMapper from "./types/user.mapper"
import NotFoundError from "@/errors/NotFoundError"
import { Transaction } from "@/utils/transaction"

class UserService {
	async getAll(): Promise<UserDto[]> {
		return (await userRepository.findAll()).map((o) => UserMapper.toDto(o))
	}

	async getById(id: number): Promise<UserDto> {
		const user = await userRepository.findById(id)

		if (!user) {
			throw new NotFoundError("User not found")
		}

		return UserMapper.toDto(user)
	}

	async create(user: UserCreate): Promise<UserDto> {
		return Transaction.run(async () => {
			const id = await userRepository.create(user)
			return await this.getById(id)
		})
	}

	async update(id: number, user: UserUpdate): Promise<UserDto> {
		return Transaction.run(async () => {
			await userRepository.update(id, user)
			return await this.getById(id)
		})
	}

	async delete(id: number): Promise<void> {
		const deleted = await userRepository.delete(id)
		if (!deleted) {
			throw new NotFoundError("User not found")
		}
	}
}

export default new UserService()
