import axiosInstance from "@/config/axios"
import UserCreate from "@/shared/types/user/user.create"
import UserDto from "@/shared/types/user/user.dto"
import UserUpdate from "@/shared/types/user/user.update"

class UserApi {
	path = `user/`

	async getAll() {
		const { data } = await axiosInstance.get(this.path)
		return data as UserDto[]
	}

	async getSelfAuthenticated() {
		const { data } = await axiosInstance.get(
			`${this.path}selfAuthenticated`,
			{
				withCredentials: true,
			},
		)

		return data as UserDto
	}

	async getByUsername(username: string) {
		const { data } = await axiosInstance.get(this.path, {
			params: { username },
		})

		return data as UserDto
	}

	async create(user: UserCreate) {
		const { data } = await axiosInstance.post(this.path, user)

		return data as UserDto
	}

	async update(user: UserUpdate) {
		const { data } = await axiosInstance.put(this.path, user)

		return data as UserDto
	}

	async delete(username: string) {
		await axiosInstance.delete(this.path, {
			params: { username },
		})
	}
}

export default new UserApi()
