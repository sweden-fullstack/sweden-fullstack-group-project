import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware" // add persist
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import sectionUserApi from "@/api/sectionUser"

export interface SelfUserState {
	/**
	 * internal don't use
	 */
	_user: SectionUserDto | undefined
	/**
	 * Gets the current signed in user
	 * @param refresh if true will re-fetch the user data
	 * @throws Error on failure to get the user, for example user not signed in
	 */
	get: (refresh?: boolean) => Promise<SectionUserDto>
}

export const useUserStore = create<SelfUserState>()(
	persist(
		(set, get) => ({
			_user: undefined,
			get: async (refresh?: boolean) => {
				if (get()._user || refresh) {
					set({
						_user: await sectionUserApi.getSelfAuthenticated(),
					})
				}
				return get()._user!
			},
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ _user: state._user }),
		},
	),
)

export default useUserStore
