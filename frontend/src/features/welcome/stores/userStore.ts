import UserDto from "@/shared/types/user/user.dto"
import { create } from "zustand"
import UserApi from "@/api/user"

export type UserState = {
	users: UserDto[]
	getUsers: () => Promise<void>
}

export const useUserStore = create<UserState>()((set, get) => ({
	users: [],
	getUsers: async () => {
		if (get().users.length > 0) return

		const data = await UserApi.getAll()
		set({ users: data })
	},
}))

export default useUserStore
