export type Resident = {
	id: number
	name: string
}

export type ViewMode = "section" | "mine"

export type NextMyDuty = {
	dateKey: string
	tasks: string[]
}

export type MyDutyEntry = {
	dateKey: string
	tasks: string[]
}

export type SelectedDayRow = {
	eventId: number | null
	name: string
	assigneeIds: number[]
}
