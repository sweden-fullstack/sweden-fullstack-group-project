import { create } from "zustand"

export type CounterState = {
	count: number
	increment: () => void
}

const useCounterStore = create<CounterState>((set) => ({
	count: 0,

	increment: () =>
		set((state) => ({
			count: state.count + 1,
		})),
}))

export default useCounterStore
