import UserDto from "@/shared/types/user/user.dto"
import { create } from "zustand"
import UserApi from "@/api/user"

export type UserState = {
	users: UserDto[]
	getUsers: () => Promise<void>
	getUserSelf: () => Promise<UserDto | undefined>
	appendUsers: (users: UserDto[]) => Promise<void>
}

const seedUsers: UserDto[] = [
	{
		id: 1,
		email: "",
		firstName: "Alice",
		lastName: "Smith",
		sectionId: 1,
	},
	{
		id: 2,
		email: "",
		firstName: "Bob",
		lastName: "Lee",
		sectionId: 1,
	},
	{
		id: 3,
		email: "",
		firstName: "Mike",
		lastName: "Wang",
		sectionId: 1,
	},
	{
		id: 4,
		email: "",
		firstName: "Amy",
		lastName: "Brown",
		sectionId: 1,
	},
]

export const useUserStore = create<UserState>()((set, get) => ({
	users: seedUsers,
	getUsers: async () => {
		try {
			const data = await UserApi.getAll()
			if (data.length > 0) {
				set({ users: data })
			}
		} catch {
			//later
		}
	},
	getUserSelf: async () => {
		// Placeholder!
		const users = get().users
		if (users.length === 0) return undefined
		return users[0]
	},
	appendUsers: async (users: UserDto[]) => {
		set((state) => ({ users: [...state.users, ...users] }))
	},
}))

export default useUserStore
