import UserDto from "@/shared/types/user/user.dto"
import { create } from "zustand"
import UserApi from "@/api/user"

export type UserState = {
	users: UserDto[]
	getUsers: () => Promise<void>
	getUserSelf: () => Promise<UserDto | undefined>
	appendUsers: (users: UserDto[]) => Promise<void>
}

const defaultStayPeriod = {
	major: "Computer Science",
	stayPeriodStart: new Date("2025-09-01"),
	stayPeriodEnd: new Date("2026-06-30"),
}

const seedUsers: UserDto[] = [
	{
		id: 1,
		email: "",
		firstName: "Alice",
		lastName: "Smith",
		roomNumber: 101,
		sectionId: 1,
		buildingId: 1,
		role: "landlord",
		...defaultStayPeriod,
	},
	{
		id: 2,
		email: "",
		firstName: "Bob",
		lastName: "Lee",
		roomNumber: 102,
		sectionId: 1,
		...defaultStayPeriod,
	},
	{
		id: 3,
		email: "",
		firstName: "Mike",
		lastName: "Wang",
		roomNumber: 103,
		sectionId: 1,
		...defaultStayPeriod,
	},
	{
		id: 4,
		email: "",
		firstName: "Amy",
		lastName: "Brown",
		roomNumber: 104,
		sectionId: 1,
		...defaultStayPeriod,
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
