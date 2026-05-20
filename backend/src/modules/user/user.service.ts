import userRepository from "./user.repository"
import UserDto from "@/shared/types/user/user.dto"
import UserCreate from "@/shared/types/user/user.create"
import UserUpdate from "@/shared/types/user/user.update"
import UserMapper from "./types/user.mapper"
import NotFoundError from "@/errors/NotFoundError"
import { Transaction } from "@/utils/transaction"
import BadRequestError from "@/errors/BadRequestError"
import ConflictError from "@/errors/ConflictError"

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

	async findByEmail(email: string): Promise<UserDto | null> {
		const user = await userRepository.findByEmail(email)

		if (!user) return null
		return UserMapper.toDto(user)
	}

	async getByEmail(email: string): Promise<UserDto> {
		const user = await this.findByEmail(email)

		if (!user) {
			throw new NotFoundError("User not found")
		}

		return user
	}

	async create(user: UserCreate): Promise<UserDto> {
		return await Transaction.run(async () => {
			const userWithEmailExists = await userRepository.findByEmail(
				user.email,
			)
			if (userWithEmailExists) {
				throw new ConflictError(
					`User with email ${user.email} already exists`,
				)
			}

			const id = await userRepository.create(UserMapper.toEntity(user))
			return await this.getById(id)
		})
	}

	async update(id: number, user: UserUpdate): Promise<UserDto> {
		return await Transaction.run(async () => {
			const userModified = await userRepository.update(
				id,
				UserMapper.toEntity(user),
			)
			if (!userModified) {
				throw new BadRequestError(
					`User with id ${id} was either not found or there was nothing to update`,
				)
			}
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
