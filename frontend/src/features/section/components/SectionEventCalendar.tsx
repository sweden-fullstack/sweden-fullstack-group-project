import { Box, Button, Grid, Text, VStack } from "@chakra-ui/react"
import { useMemo, useState } from "react"
import useWindowSize from "@/hooks/useWindowSize"
import { getCalendarTitleCharLimit } from "@/features/section/utils/calendarTitleLimit"
import { indexEventsByDay } from "@/features/section/utils/eventsByDay"
import { addMonths, buildMonthGrid } from "./calendar/monthGrid"
import { sameCalendarDay, toDateKey } from "@/utils/date"
import type { SectionCalendarEvent, SectionEventDraft } from "../types"
import type { EventEditorDraft } from "./EventEditorOverlay"
import EventEditorOverlay from "./EventEditorOverlay"
import CalendarHeader, { type CalendarFilter } from "./CalendarHeader"
import CalendarEventMarker from "./calendar/CalendarEventMarker"

type Props = {
	sectionId: number
	events: SectionCalendarEvent[]
	onCreate: (payload: SectionEventDraft) => void | Promise<unknown>
	onUpdate: (event: SectionCalendarEvent) => void | Promise<unknown>
	onRemove: (id: number) => void | Promise<unknown>
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const maxPills = 3

function blankDraft(sectionId: number): SectionEventDraft {
	const start = new Date()
	start.setMinutes(0, 0, 0)
	start.setHours(start.getHours() + 1)
	const end = new Date(start)
	end.setHours(end.getHours() + 1)
	return {
		sectionId,
		buildingId: 1,
		eventType: "section",
		title: "",
		startTime: start,
		endTime: end,
		description: "",
		visibility: "section",
	}
}

function toEditorDraft(event: SectionCalendarEvent): EventEditorDraft {
	return {
		...event,
		startTime: new Date(event.startTime),
		endTime: new Date(event.endTime),
	}
}

export default function SectionEventCalendar({
	sectionId,
	events,
	onCreate,
	onUpdate,
	onRemove,
}: Props) {
	const [month, setMonth] = useState(() => new Date())
	const [filter, setFilter] = useState<CalendarFilter>("all")
	const [editorOpen, setEditorOpen] = useState(false)
	const [draft, setDraft] = useState<EventEditorDraft | null>(null)
	const [expandedKey, setExpandedKey] = useState<string | null>(null)

	const filtered = useMemo(() => {
		if (filter === "all") return events
		if (filter === "building")
			return events.filter((e) => e.visibility === "building")
		return events.filter((e) => e.visibility === "section")
	}, [events, filter])

	const eventsByDay = useMemo(() => indexEventsByDay(filtered), [filtered])
	const weeks = useMemo(() => buildMonthGrid(month), [month])
	const today = new Date()
	const { width } = useWindowSize()
	const titleMaxChars = useMemo(
		() => getCalendarTitleCharLimit(width),
		[width],
	)

	function openEditor(next: EventEditorDraft) {
		setDraft(next)
		setEditorOpen(true)
	}

	function closeEditor() {
		setEditorOpen(false)
		setDraft(null)
	}

	return (
		<>
			<Box
				bg="linear-gradient(180deg, #f4f9ff 0%, #eef6f1 100%)"
				border="1px solid #cfe1f7"
				borderRadius="22px"
				p={{ base: 4, md: 5 }}
				boxShadow="0 10px 28px rgba(83, 130, 182, 0.12)"
			>
				<VStack align="stretch" gap={4}>
					<CalendarHeader
						month={month}
						onPrev={() => setMonth((d) => addMonths(d, -1))}
						onNext={() => setMonth((d) => addMonths(d, 1))}
						onToday={() => setMonth(new Date())}
						filter={filter}
						onFilter={setFilter}
						onAdd={() => openEditor(blankDraft(sectionId))}
					/>

					<Grid templateColumns="repeat(7, minmax(0, 1fr))" gap={1}>
						{weekdays.map((d) => (
							<Text
								key={d}
								fontSize="xs"
								fontWeight="semibold"
								color="#5d6d63"
								textAlign="center"
								py={1}
							>
								{d}
							</Text>
						))}
					</Grid>

					<VStack align="stretch" gap={1}>
						{weeks.map((row, wi) => (
							<Grid
								key={wi}
								templateColumns="repeat(7, minmax(0, 1fr))"
								gap={1}
							>
								{row.map((cell) => {
									const key = toDateKey(cell.date)
									const list = eventsByDay.get(key) ?? []
									const expanded = expandedKey === key
									const shown = expanded
										? list
										: list.slice(0, maxPills)
									const more = expanded
										? 0
										: Math.max(0, list.length - maxPills)
									const isToday = sameCalendarDay(
										cell.date,
										today,
									)

									return (
										<Box
											key={key}
											minW={0}
											minH="108px"
											bg={
												cell.inCurrentMonth
													? "rgba(255,255,255,0.88)"
													: "rgba(255,255,255,0.35)"
											}
											border="1px solid rgba(30, 42, 36, 0.08)"
											borderRadius="14px"
											p={1.5}
										>
											<Text
												fontSize="sm"
												fontWeight={
													isToday ? "bold" : "medium"
												}
												color={
													cell.inCurrentMonth
														? "#1e2a24"
														: "#9aa89f"
												}
												bg={
													isToday
														? "#90d5ff"
														: "transparent"
												}
												borderRadius="full"
												display="inline-block"
												minW="26px"
												textAlign="center"
												lineHeight="26px"
												mb={1}
												px={isToday ? 1 : 0}
											>
												{cell.date.getDate()}
											</Text>
											<VStack align="stretch" gap={0.5}>
												{shown.map((ev) => (
													<CalendarEventMarker
														key={ev.id}
														event={ev}
														titleMaxChars={
															titleMaxChars
														}
														onSelect={() =>
															openEditor(
																toEditorDraft(
																	ev,
																),
															)
														}
													/>
												))}
												{more > 0 ? (
													<Button
														variant="ghost"
														size="xs"
														w="100%"
														minW={0}
														maxW="100%"
														boxSizing="border-box"
														h="auto"
														minH="6"
														px={1}
														py={0}
														fontSize="10px"
														lineHeight="1"
														overflow="hidden"
														textOverflow="ellipsis"
														whiteSpace="nowrap"
														color="#3d6b8a"
														title={`${more} more events`}
														onClick={() =>
															setExpandedKey(
																(k) =>
																	k === key
																		? null
																		: key,
															)
														}
													>
														{more} more...
													</Button>
												) : null}
											</VStack>
										</Box>
									)
								})}
							</Grid>
						))}
					</VStack>
				</VStack>
			</Box>

			<EventEditorOverlay
				open={editorOpen}
				draft={draft}
				sectionId={sectionId}
				onClose={closeEditor}
				onCreate={onCreate}
				onUpdate={onUpdate}
				onDelete={onRemove}
			/>
		</>
	)
}
