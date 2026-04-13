import envConfig from "@/config/env"
import UserCreate from "@/shared/types/user/user.create"
import UserDto from "@/shared/types/user/user.dto"
import UserUpdate from "@/shared/types/user/user.update"
import axios from "axios"

class UserApi {
	path = `${envConfig.backend}user/`

	async getAll() {
		const { data } = await axios.get(this.path)
		return data as UserDto[]
	}

	async getByUsername(username: string) {
		const { data } = await axios.get(this.path, {
			params: { username },
		})

		return data as UserDto
	}

	async create(user: UserCreate) {
		const { data } = await axios.post(this.path, user)

		return data as UserDto
	}

	async update(user: UserUpdate) {
		const { data } = await axios.put(this.path, user)

		return data as UserDto
	}

	async delete(username: string) {
		await axios.delete(this.path, {
			params: { username },
		})
	}
}

export default new UserApi()
