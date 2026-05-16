import express from "express"

// This may be some of the WORST code I have EVER written but javascript has forced my hand,
// ISO date format should behave the same way with a magic cast to string back and forth
// however, if a string that looks like YYYY-MM-DD is passed it will get converted to ISO date
// I miss true type safety
const expressJsonParser = express.json({
	reviver: (_key, value) => {
		if (typeof value !== "string") return value

		// YYYY-MM-DD format (2026-01-01)
		const isSimpleDate = /^\d{4}-\d{2}-\d{2}$/.test(value)

		// ISO format (2026-01-01T00:00:00.000Z)
		const isISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(value)

		if (isSimpleDate || isISO) {
			const date = new Date(value)
			if (!isNaN(date.getTime())) {
				return date
			}
		}

		return value
	},
})

export default expressJsonParser
