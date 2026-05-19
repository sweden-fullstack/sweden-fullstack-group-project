export function truncateEventTitle(title: string, maxChars: number): string {
	const trimmed = title.trim()
	if (trimmed.length <= maxChars) return trimmed
	if (maxChars <= 1) return trimmed.slice(0, 1)
	return `${trimmed.slice(0, maxChars)}…`
}
