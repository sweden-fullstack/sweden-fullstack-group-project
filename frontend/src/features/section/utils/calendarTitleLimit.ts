const fullWidthBreakpoint = 760

const columnCount = 7
const columnGapPx = 4
const cellPaddingPx = 14
const charWidthPx = 6.5

export function getCalendarTitleCharLimit(windowWidth: number): number | null {
	if (windowWidth >= fullWidthBreakpoint) return null

	const gaps = columnCount - 1
	const cellWidth = (windowWidth - gaps * columnGapPx) / columnCount
	const usable = cellWidth - cellPaddingPx
	return Math.max(1, Math.floor(Math.max(0, usable) / charWidthPx))
}
