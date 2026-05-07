export type Resident = {
	id: number
	name: string
}

export type CleaningTask = {
	name: string
	assigneeId: number | null
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
	name: string
	assigneeId: number | null
}

export type CleaningStateDto = {
	sectionId: number
	currentUserId: number
	residents: Resident[]
	dutyTemplate: string[]
	daysWithoutCleaning: string[]
	schedule: Record<string, CleaningTask[]>
}
