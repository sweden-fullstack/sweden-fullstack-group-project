import AppShell from "@/components/AppShell"
import { getCleaningState, saveCleaningState } from "@/api/cleaning"
import { Box, Grid, Spinner, Text, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import "react-calendar/dist/Calendar.css"
import AddTaskCard from "./components/AddTaskCard"
import CleaningCalendar from "./components/CleaningCalendar"
import MyDutySchedule from "./components/MyDutySchedule"
import NextDutyCard from "./components/NextDutyCard"
import SectionDutyTable from "./components/SectionDutyTable"
import ViewModeToggle from "./components/ViewModeToggle"
import type {
	CleaningTask,
	MyDutyEntry,
	NextMyDuty,
	Resident,
	SelectedDayRow,
	ViewMode,
} from "./types"
import { toDateKey } from "./utils/date"

export default function CleaningPage() {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [viewMode, setViewMode] = useState<ViewMode>("section")
	const [sectionId, setSectionId] = useState(1)
	const [currentUserId, setCurrentUserId] = useState(1)
	const [residents, setResidents] = useState<Resident[]>([])
	const [schedule, setSchedule] = useState<Record<string, CleaningTask[]>>({})
	const [dutyTemplate, setDutyTemplate] = useState<string[]>([])
	const [daysWithoutCleaning, setDaysWithoutCleaning] = useState<string[]>([])
	const [newTaskName, setNewTaskName] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function loadPageData() {
			try {
				const data = await getCleaningState()
				setSectionId(data.sectionId)
				setCurrentUserId(data.currentUserId)
				setResidents(data.residents)
				setSchedule(data.schedule)
				setDutyTemplate(data.dutyTemplate)
				setDaysWithoutCleaning(data.daysWithoutCleaning)
			} catch {
				setError("Could not load cleaning schedule.")
			} finally {
				setIsLoading(false)
			}
		}

		void loadPageData()
	}, [])

	async function persistState(next: {
		schedule?: Record<string, CleaningTask[]>
		dutyTemplate?: string[]
		daysWithoutCleaning?: string[]
	}) {
		await saveCleaningState({
			sectionId,
			schedule: next.schedule ?? schedule,
			dutyTemplate: next.dutyTemplate ?? dutyTemplate,
			daysWithoutCleaning:
				next.daysWithoutCleaning ?? daysWithoutCleaning,
		})
	}

	const selectedDateKey = toDateKey(selectedDate)
	const selectedTasks = schedule[selectedDateKey] ?? []
	const isSelectedDayDisabled = daysWithoutCleaning.includes(selectedDateKey)

	const selectedDayRows = useMemo<SelectedDayRow[]>(() => {
		if (isSelectedDayDisabled) {
			return []
		}

		const assigneeByDuty = new Map(
			selectedTasks.map((task) => [task.name, task.assigneeId]),
		)
		return dutyTemplate.map((dutyName) => ({
			name: dutyName,
			assigneeId: assigneeByDuty.get(dutyName) ?? null,
		}))
	}, [dutyTemplate, isSelectedDayDisabled, selectedTasks])

	const allUpcomingTasks = useMemo(() => {
		const nowKey = toDateKey(new Date())
		return Object.entries(schedule)
			.filter(([dateKey]) => dateKey >= nowKey)
			.flatMap(([dateKey, dayTasks]) =>
				dayTasks.map((task) => ({ ...task, dateKey })),
			)
			.sort((a, b) => {
				if (a.dateKey === b.dateKey) {
					return a.name.localeCompare(b.name)
				}
				return a.dateKey.localeCompare(b.dateKey)
			})
	}, [schedule])

	const nextMyDuty = useMemo<NextMyDuty | null>(() => {
		const myTasks = allUpcomingTasks.filter(
			(task) => task.assigneeId === currentUserId,
		)
		if (!myTasks.length) {
			return null
		}
		const nextDateKey = myTasks[0].dateKey
		return {
			dateKey: nextDateKey,
			tasks: myTasks
				.filter((task) => task.dateKey === nextDateKey)
				.map((task) => task.name),
		}
	}, [allUpcomingTasks, currentUserId])

	const myDutyScheduleList = useMemo<MyDutyEntry[]>(() => {
		const grouped = new Map<string, string[]>()
		for (const task of allUpcomingTasks) {
			if (task.assigneeId !== currentUserId) {
				continue
			}
			const tasksOnDate = grouped.get(task.dateKey) ?? []
			tasksOnDate.push(task.name)
			grouped.set(task.dateKey, tasksOnDate)
		}

		return Array.from(grouped.entries())
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([dateKey, tasks]) => ({
				dateKey,
				tasks: tasks.sort((a, b) => a.localeCompare(b)),
			}))
	}, [allUpcomingTasks, currentUserId])

	const myDutyDateSet = useMemo(
		() => new Set(myDutyScheduleList.map((entry) => entry.dateKey)),
		[myDutyScheduleList],
	)

	function updateDutyAssignee(dutyName: string, assigneeIdValue: string) {
		if (isSelectedDayDisabled) {
			return
		}
		const nextAssigneeId = assigneeIdValue ? Number(assigneeIdValue) : null
		const dayTasks = schedule[selectedDateKey] ?? []
		const existingIndex = dayTasks.findIndex(
			(task) => task.name === dutyName,
		)
		const nextDayTasks = [...dayTasks]

		if (existingIndex >= 0) {
			nextDayTasks[existingIndex] = {
				name: dutyName,
				assigneeId: nextAssigneeId,
			}
		} else {
			nextDayTasks.push({ name: dutyName, assigneeId: nextAssigneeId })
		}

		const nextSchedule = { ...schedule, [selectedDateKey]: nextDayTasks }
		setSchedule(nextSchedule)
		void persistState({ schedule: nextSchedule })
	}

	function deleteDuty(dutyName: string) {
		const nextDutyTemplate = dutyTemplate.filter(
			(name) => name !== dutyName,
		)
		const nextSchedule: Record<string, CleaningTask[]> = {}

		for (const [dateKey, dayTasks] of Object.entries(schedule)) {
			const filteredTasks = dayTasks.filter(
				(task) => task.name !== dutyName,
			)
			if (filteredTasks.length) {
				nextSchedule[dateKey] = filteredTasks
			}
		}

		setDutyTemplate(nextDutyTemplate)
		setSchedule(nextSchedule)
		void persistState({
			dutyTemplate: nextDutyTemplate,
			schedule: nextSchedule,
		})
	}

	function clearSelectedDay() {
		const nextSchedule = { ...schedule }
		delete nextSchedule[selectedDateKey]

		const nextDaysWithoutCleaning = daysWithoutCleaning.includes(
			selectedDateKey,
		)
			? daysWithoutCleaning
			: [...daysWithoutCleaning, selectedDateKey]

		setSchedule(nextSchedule)
		setDaysWithoutCleaning(nextDaysWithoutCleaning)
		void persistState({
			schedule: nextSchedule,
			daysWithoutCleaning: nextDaysWithoutCleaning,
		})
	}

	function addTask() {
		const taskName = newTaskName.trim()
		if (!taskName) {
			return
		}
		if (
			dutyTemplate.some(
				(name) => name.toLowerCase() === taskName.toLowerCase(),
			)
		) {
			return
		}

		const nextDutyTemplate = [...dutyTemplate, taskName]
		const nextDaysWithoutCleaning = daysWithoutCleaning.filter(
			(dateKey) => dateKey !== selectedDateKey,
		)

		setDutyTemplate(nextDutyTemplate)
		setDaysWithoutCleaning(nextDaysWithoutCleaning)
		setNewTaskName("")
		void persistState({
			dutyTemplate: nextDutyTemplate,
			daysWithoutCleaning: nextDaysWithoutCleaning,
		})
	}

	return (
		<AppShell
			title="Cleaning"
			description="Section cleaning calendar: view and edit shared duties, or filter to your own assignments."
		>
			{isLoading ? (
				<Spinner />
			) : error ? (
				<Text color="#9b2c2c">{error}</Text>
			) : (
				<VStack align="stretch" gap={6}>
					<NextDutyCard nextMyDuty={nextMyDuty} />
					<ViewModeToggle
						viewMode={viewMode}
						onChange={setViewMode}
					/>

					<Grid
						templateColumns={{ base: "1fr", lg: "1.2fr 0.9fr" }}
						gap={5}
						bg="linear-gradient(180deg, #f7fbff 0%, #f0f6ff 100%)"
						border="1px solid #dce8f6"
						borderRadius="24px"
						p={{ base: 3, md: 4 }}
					>
						<VStack align="stretch" gap={4}>
							<Box
								bg="rgba(255,255,255,0.92)"
								border="1px solid #dce8f6"
								borderRadius="22px"
								p={5}
								boxShadow="0 8px 24px rgba(43, 107, 176, 0.08)"
							>
								{viewMode === "mine" ? (
									<MyDutySchedule
										entries={myDutyScheduleList}
									/>
								) : (
									<SectionDutyTable
										selectedDateKey={selectedDateKey}
										isSelectedDayDisabled={
											isSelectedDayDisabled
										}
										selectedDayRows={selectedDayRows}
										residents={residents}
										onClearDay={clearSelectedDay}
										onAssigneeChange={updateDutyAssignee}
										onDeleteTask={deleteDuty}
									/>
								)}
							</Box>

							{viewMode === "section" ? (
								<AddTaskCard
									newTaskName={newTaskName}
									onChangeTaskName={setNewTaskName}
									onAddTask={addTask}
								/>
							) : null}
						</VStack>

						<CleaningCalendar
							selectedDate={selectedDate}
							onSelectedDateChange={setSelectedDate}
							daysWithoutCleaning={daysWithoutCleaning}
							viewMode={viewMode}
							myDutyDateSet={myDutyDateSet}
							dutyTemplate={dutyTemplate}
						/>
					</Grid>
				</VStack>
			)}
		</AppShell>
	)
}

export const Component = CleaningPage
