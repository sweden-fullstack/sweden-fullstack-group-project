import { Box } from "@chakra-ui/react"
import Calendar from "react-calendar"
import styles from "./CleaningCalendar.module.css"
import { toDateKey } from "../utils/date"

type Props = {
	selectedDate: Date
	onSelectedDateChange: (date: Date) => void
	dutyDateSet: Set<string>
	viewMode: "section" | "mine"
}

export default function CleaningCalendar({
	selectedDate,
	onSelectedDateChange,
	dutyDateSet,
	viewMode,
}: Props) {
	return (
		<Box
			bg="linear-gradient(180deg, #f4f9ff 0%, #e8f2ff 100%)"
			border="1px solid #cfe1f7"
			borderRadius="22px"
			p={5}
			boxShadow="0 10px 28px rgba(83, 130, 182, 0.14)"
		>
			<Calendar
				className={styles.calendar}
				locale="en-US"
				value={selectedDate}
				onChange={(value) => {
					if (Array.isArray(value)) {
						onSelectedDateChange(value[0] ?? new Date())
					} else {
						onSelectedDateChange(value ?? new Date())
					}
				}}
				tileClassName={({ date, view }) => {
					if (view !== "month") {
						return null
					}
					const dateKey = toDateKey(date)
					const classes: string[] = []
					if (viewMode === "mine" && dutyDateSet.has(dateKey)) {
						classes.push(styles.myDutyCircle)
					}
					return classes.join(" ")
				}}
				tileContent={({ date, view }) => {
					if (view !== "month") {
						return null
					}
					if (viewMode === "mine") {
						return null
					}
					const dateKey = toDateKey(date)
					if (!dutyDateSet.has(dateKey)) {
						return null
					}
					return <span className={styles.dutyDot} />
				}}
			/>
		</Box>
	)
}
