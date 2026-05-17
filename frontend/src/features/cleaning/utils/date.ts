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
