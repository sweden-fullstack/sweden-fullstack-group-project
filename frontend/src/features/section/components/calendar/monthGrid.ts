export type MonthCell = {
	date: Date
	inCurrentMonth: boolean
}

export function startOfMonth(d: Date) {
	return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function endOfMonth(d: Date) {
	return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

export function addMonths(d: Date, delta: number) {
	return new Date(d.getFullYear(), d.getMonth() + delta, 1)
}

export function buildMonthGrid(visibleMonth: Date): MonthCell[][] {
	const y = visibleMonth.getFullYear()
	const m = visibleMonth.getMonth()
	const first = new Date(y, m, 1)
	const mondayOffset = (first.getDay() + 6) % 7
	const gridStart = new Date(y, m, 1 - mondayOffset)

	const weeks: MonthCell[][] = []
	const cursor = new Date(gridStart)

	for (let w = 0; w < 6; w++) {
		const row: MonthCell[] = []
		for (let i = 0; i < 7; i++) {
			row.push({
				date: new Date(cursor),
				inCurrentMonth: cursor.getMonth() === m,
			})
			cursor.setDate(cursor.getDate() + 1)
		}
		weeks.push(row)
	}
	return weeks
}
