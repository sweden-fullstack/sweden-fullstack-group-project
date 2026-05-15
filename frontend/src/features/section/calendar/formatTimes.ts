const LOCALE = "en-US" as const

export function formatTimeRange(start: Date, end: Date) {
	const opts: Intl.DateTimeFormatOptions = {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	}
	return `${start.toLocaleString(LOCALE, opts)} – ${end.toLocaleString(LOCALE, opts)}`
}

export function formatTimeShort(d: Date) {
	return d.toLocaleTimeString(LOCALE, {
		hour: "numeric",
		minute: "2-digit",
	})
}

export function formatMonthHeading(d: Date) {
	return d.toLocaleString(LOCALE, { month: "long", year: "numeric" })
}

export function formatDayRangeInMonth(d: Date) {
	const start = new Date(d.getFullYear(), d.getMonth(), 1)
	const end = new Date(d.getFullYear(), d.getMonth() + 1, 0)
	const longFmt: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	}
	return `${start.toLocaleDateString(LOCALE, longFmt)} – ${end.toLocaleDateString(LOCALE, longFmt)}`
}

export function toLocalDatetimeInputValue(date: Date) {
	const p = (n: number) => String(n).padStart(2, "0")
	return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T${p(date.getHours())}:${p(date.getMinutes())}`
}
