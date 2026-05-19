export function toDateKey(date: Date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")
	return `${year}-${month}-${day}`
}

export function formatDate(dateKey: string) {
	return new Date(`${dateKey}T00:00:00`).toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
	})
}

export function sameCalendarDay(a: Date, b: Date) {
	return a.toDateString() === b.toDateString()
}

export function isDayBetween(day: Date, start: Date, end: Date) {
	const dayStr = day.toDateString()
	const startStr = start.toDateString()
	const endStr = end.toDateString()
	return dayStr >= startStr && dayStr <= endStr
}

export function toLocalDatetimeInputValue(date: Date) {
	const p = (n: number) => String(n).padStart(2, "0")
	return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T${p(date.getHours())}:${p(date.getMinutes())}`
}

export function parseLocalDatetimeInputValue(value: string): Date | null {
	const parsed = new Date(value)
	return Number.isNaN(parsed.getTime()) ? null : parsed
}
