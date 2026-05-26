import AppShell from "@/components/AppShell"
import CleaningApi from "@/api/cleaning"
import SectionUserApi from "@/api/sectionUser"
import { Box, Grid, Spinner, Text, VStack } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import "react-calendar/dist/Calendar.css"
import AddTaskCard from "./components/AddTaskCard"
import CleaningCalendar from "./components/CleaningCalendar"
import MyDutySchedule from "./components/MyDutySchedule"
import NextDutyCard from "./components/NextDutyCard"
import SectionDutyTable from "./components/SectionDutyTable"
import ViewModeToggle from "./components/ViewModeToggle"
import type { MyDutyEntry, NextMyDuty, SelectedDayRow, ViewMode } from "./types"
import SectionEventAssigneeDto from "@/shared/types/section-event-assignee/sectionEventAssignee.dto"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import { toDateKey } from "@/utils/date"

export default function CleaningPage() {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [viewMode, setViewMode] = useState<ViewMode>("section")
	const [currentUser, setCurrentUser] = useState<SectionUserDto | null>(null)
	const [sectionUsers, setSectionUsers] = useState<SectionUserDto[]>([])
	const [cleaningEvents, setCleaningEvents] = useState<
		SectionEventAssigneeDto[]
	>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const refreshEvents = useCallback(async (sectionIdValue: number) => {
		if (!sectionIdValue) return
		const events = await CleaningApi.getBySection(sectionIdValue)
		setCleaningEvents(events)
	}, [])

	useEffect(() => {
		async function loadPageData() {
			try {
				const self = await SectionUserApi.getSelfAuthenticated()
				setCurrentUser(self)

				const sectionUsers = await SectionUserApi.getUsersBySection()
				setSectionUsers(sectionUsers)

				await refreshEvents(self.sectionId)
			} catch {
				setError("Could not load cleaning schedule.")
			} finally {
				setIsLoading(false)
			}
		}

		void loadPageData()
	}, [refreshEvents])

	const selectedDateKey = toDateKey(selectedDate)

	const selectedDayEvents = useMemo(
		() =>
			cleaningEvents.filter(
				(event) => toDateKey(event.startTime) === selectedDateKey,
			),
		[cleaningEvents, selectedDateKey],
	)

	const sectionDutyTemplate = useMemo(
		() =>
			Array.from(
				new Set(
					cleaningEvents
						.map((event) => event.title)
						.filter((d): d is string => Boolean(d)),
				),
			).sort((a, b) => a.localeCompare(b)),
		[cleaningEvents],
	)

	const selectedDayRows = useMemo<SelectedDayRow[]>(() => {
		const eventByDuty = new Map<string, SectionEventAssigneeDto>()
		for (const event of selectedDayEvents) {
			if (event.title) {
				eventByDuty.set(event.title, event)
			}
		}
		return sectionDutyTemplate.map((dutyName) => {
			const event = eventByDuty.get(dutyName)
			return {
				eventId: event?.id ?? null,
				name: dutyName,
				assigneeIds: event?.users?.map((user) => user.userId) ?? [],
			}
		})
	}, [sectionDutyTemplate, selectedDayEvents])

	const allUpcomingEvents = useMemo(() => {
		const nowKey = toDateKey(new Date())
		return cleaningEvents
			.map((event) => ({
				event,
				dateKey: toDateKey(new Date(event.startTime)),
			}))
			.filter(({ dateKey }) => dateKey >= nowKey)
			.sort((a, b) => {
				if (a.dateKey === b.dateKey) {
					return (a.event.title ?? "").localeCompare(
						b.event.title ?? "",
					)
				}
				return a.dateKey.localeCompare(b.dateKey)
			})
	}, [cleaningEvents])

	const nextMyDuty = useMemo<NextMyDuty | null>(() => {
		const myItems = allUpcomingEvents.filter(({ event }) =>
			event.users?.some((user) => user.userId === currentUser?.userId),
		)
		if (!myItems.length) {
			return null
		}
		const nextDateKey = myItems[0].dateKey
		return {
			dateKey: nextDateKey,
			tasks: myItems
				.filter((item) => item.dateKey === nextDateKey)
				.map((item) => item.event.title ?? ""),
		}
	}, [allUpcomingEvents, currentUser])

	const myDutyScheduleList = useMemo<MyDutyEntry[]>(() => {
		const grouped = new Map<string, string[]>()
		for (const { event, dateKey } of allUpcomingEvents) {
			if (
				!event.users?.some(
					(user) => user.userId === currentUser?.userId,
				)
			) {
				continue
			}
			const tasksOnDate = grouped.get(dateKey) ?? []
			tasksOnDate.push(event.title ?? "")
			grouped.set(dateKey, tasksOnDate)
		}

		return Array.from(grouped.entries())
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([dateKey, tasks]) => ({
				dateKey,
				tasks: tasks.sort((a, b) => a.localeCompare(b)),
			}))
	}, [allUpcomingEvents, currentUser])

	const myDutyDateSet = useMemo(
		() => new Set(myDutyScheduleList.map((entry) => entry.dateKey)),
		[myDutyScheduleList],
	)

	const daysWithAssignedDuty = useMemo(
		() =>
			new Set(
				cleaningEvents
					.filter((event) => (event.users?.length ?? 0) > 0)
					.map((event) => toDateKey(new Date(event.startTime))),
			),
		[cleaningEvents],
	)

	async function updateDutyAssignee(
		row: SelectedDayRow,
		assigneeIds: number[],
	) {
		if (!currentUser) return

		const nextUsers = assigneeIds
			.map((id) => sectionUsers.find((user) => user.userId === id))
			.filter((user): user is SectionUserDto => Boolean(user))

		try {
			if (row.eventId !== null) {
				await CleaningApi.updateAssignees(row.eventId, nextUsers)
			} else {
				const startTime = new Date(selectedDate)
				startTime.setHours(10, 0, 0, 0)
				const endTime = new Date(selectedDate)
				endTime.setHours(11, 0, 0, 0)

				await CleaningApi.create({
					title: row.name,
					buildingId: currentUser.buildingId,
					sectionId: currentUser.sectionId,
					startTime: startTime,
					endTime: endTime,
					users: nextUsers,
				})
			}
			await refreshEvents(currentUser.sectionId)
		} catch {
			setError("Could not update assignee.")
		}
	}

	async function deleteDuty(dutyName: string) {
		if (!currentUser) return

		const matchingEventIds = cleaningEvents
			.filter((event) => event.title === dutyName)
			.map((event) => event.id)
		try {
			await Promise.all(
				matchingEventIds.map((id) => CleaningApi.delete(id)),
			)
			await refreshEvents(currentUser.sectionId)
		} catch {
			setError("Could not delete duty.")
		}
	}

	async function addTask(rawTaskName: string): Promise<boolean> {
		if (!currentUser?.sectionId) return false

		const taskName = rawTaskName.trim()
		if (!taskName) return false
		if (
			sectionDutyTemplate.some(
				(name) => name.toLowerCase() === taskName.toLowerCase(),
			)
		) {
			return false
		}

		const startTime = new Date(selectedDate)
		startTime.setHours(10, 0, 0, 0)
		const endTime = new Date(selectedDate)
		endTime.setHours(11, 0, 0, 0)

		try {
			await CleaningApi.create({
				title: taskName,
				buildingId: currentUser.buildingId,
				sectionId: currentUser.sectionId,
				startTime: startTime,
				endTime: endTime,
				users: [],
			})
			await refreshEvents(currentUser.sectionId)
			return true
		} catch {
			setError("Could not add task.")
			return false
		}
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
						templateColumns={{
							base: "1fr",
							lg: "minmax(0, 1.2fr) minmax(0, 0.9fr)",
						}}
						alignItems="start"
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
										selectedDayRows={selectedDayRows}
										residents={sectionUsers}
										onAssigneeChange={updateDutyAssignee}
										onDeleteTask={deleteDuty}
									/>
								)}
							</Box>

							{viewMode === "section" ? (
								<AddTaskCard onAddTask={addTask} />
							) : null}
						</VStack>

						<Box alignSelf="start">
							<CleaningCalendar
								selectedDate={selectedDate}
								onSelectedDateChange={setSelectedDate}
								viewMode={viewMode}
								dutyDateSet={
									viewMode === "mine"
										? myDutyDateSet
										: daysWithAssignedDuty
								}
							/>
						</Box>
					</Grid>
				</VStack>
			)}
		</AppShell>
	)
}

export const Component = CleaningPage
