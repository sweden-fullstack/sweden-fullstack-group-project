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

export function toDateKey(d: Date) {
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, "0")
	const day = String(d.getDate()).padStart(2, "0")
	return `${y}-${m}-${day}`
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
	let cursor = new Date(gridStart)

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

export function sameCalendarDay(a: Date, b: Date) {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	)
}

export function isDayBetween(day: Date, start: Date, end: Date) {
	const d = new Date(
		day.getFullYear(),
		day.getMonth(),
		day.getDate(),
		12,
		0,
		0,
		0,
	).getTime()
	const s = new Date(
		start.getFullYear(),
		start.getMonth(),
		start.getDate(),
		0,
		0,
		0,
		0,
	).getTime()
	const e = new Date(
		end.getFullYear(),
		end.getMonth(),
		end.getDate(),
		23,
		59,
		59,
		999,
	).getTime()
	return d >= s && d <= e
}
