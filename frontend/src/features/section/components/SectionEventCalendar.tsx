import {
	Box,
	Button,
	Grid,
	Heading,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import {
	addMonths,
	buildMonthGrid,
	isDayBetween,
	sameCalendarDay,
	toDateKey,
} from "../calendar/layoutMonth"
import {
	formatDayRangeInMonth,
	formatMonthHeading,
	formatTimeShort,
} from "../calendar/formatTimes"
import { eventPillColors } from "../calendar/eventColors"
import type { SectionCalendarEvent } from "../types"
import EventEditorOverlay from "./EventEditorOverlay"

type Filter = "all" | "building" | "section"

type Props = {
	sectionId: number
	events: SectionCalendarEvent[]
	// TODO With onUpdate and onCreate since we coded backend like that ;_;
	onUpsert: (e: SectionCalendarEvent) => void
	onRemove: (id: number) => void
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const maxPills = 3

// TODO ehhhh you are not supposted to set ID from the frontend!
function nextNewId(list: SectionCalendarEvent[]) {
	return Math.min(0, ...list.map((e) => e.id), 0) - 1
}

function blankDraft(sectionId: number, id: number): SectionCalendarEvent {
	const start = new Date()
	start.setMinutes(0, 0, 0)
	start.setHours(start.getHours() + 1)
	const end = new Date(start)
	end.setHours(end.getHours() + 1)
	return {
		id,
		sectionId,
		eventType: "section",
		title: "",
		startTime: start.toISOString(),
		endTime: end.toISOString(),
		description: "",
		visibility: "section",
	}
}

export default function SectionEventCalendar({
	sectionId,
	events,
	onUpsert,
	onRemove,
}: Props) {
	const [month, setMonth] = useState(() => new Date())
	const [filter, setFilter] = useState<Filter>("all")
	const [editorOpen, setEditorOpen] = useState(false)
	const [draft, setDraft] = useState<SectionCalendarEvent | null>(null)
	const [expandedKey, setExpandedKey] = useState<string | null>(null)

	const filtered = useMemo(() => {
		if (filter === "all") return events
		if (filter === "building")
			return events.filter((e) => e.visibility === "building")
		return events.filter((e) => e.visibility === "section")
	}, [events, filter])

	const weeks = useMemo(() => buildMonthGrid(month), [month])
	const today = new Date()

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
					<FlexHeader
						month={month}
						onPrev={() => setMonth((d) => addMonths(d, -1))}
						onNext={() => setMonth((d) => addMonths(d, 1))}
						onToday={() => setMonth(new Date())}
						filter={filter}
						onFilter={setFilter}
						onAdd={() => {
							setDraft(blankDraft(sectionId, nextNewId(events)))
							setEditorOpen(true)
						}}
					/>
					<Text fontSize="sm" color="#506057">
						{formatDayRangeInMonth(month)}
					</Text>

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
									const list = filtered
										.filter((ev) =>
											isDayBetween(
												cell.date,
												new Date(ev.startTime),
												new Date(ev.endTime),
											),
										)
										.sort(
											(a, b) =>
												new Date(
													a.startTime,
												).getTime() -
												new Date(b.startTime).getTime(),
										)
									const key = toDateKey(cell.date)
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
											<HStack
												justify="space-between"
												mb={1}
											>
												<Text
													fontSize="sm"
													fontWeight={
														isToday
															? "bold"
															: "medium"
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
													minW="26px"
													textAlign="center"
													lineHeight="26px"
													px={isToday ? 1 : 0}
												>
													{cell.date.getDate()}
												</Text>
											</HStack>
											<VStack align="stretch" gap={0.5}>
												{shown.map((ev) => {
													const start = new Date(
														ev.startTime,
													)
													const colors =
														eventPillColors(ev)
													return (
														<Button
															key={ev.id}
															size="xs"
															h="auto"
															py={1}
															px={1.5}
															fontWeight="normal"
															textAlign="left"
															whiteSpace="normal"
															title={ev.title}
															bg={colors.bg}
															color={colors.color}
															boxShadow={
																colors.boxShadow
															}
															border="none"
															borderRadius="8px"
															lineHeight="1.2"
															fontSize="10px"
															_hover={{
																filter: "brightness(0.97)",
															}}
															onClick={() => {
																setDraft({
																	...ev,
																})
																setEditorOpen(
																	true,
																)
															}}
														>
															{ev.title}{" "}
															<Box
																as="span"
																opacity={0.88}
															>
																{formatTimeShort(
																	start,
																)}
															</Box>
														</Button>
													)
												})}
												{more > 0 ? (
													<Button
														variant="ghost"
														size="xs"
														h="6"
														fontSize="10px"
														color="#3d6b8a"
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
				onClose={() => {
					setEditorOpen(false)
					setDraft(null)
				}}
				onSave={onUpsert}
				onDelete={onRemove}
			/>
		</>
	)
}

// TODO move to separate component
function FlexHeader({
	month,
	onPrev,
	onNext,
	onToday,
	filter,
	onFilter,
	onAdd,
}: {
	month: Date
	onPrev: () => void
	onNext: () => void
	onToday: () => void
	filter: Filter
	onFilter: (f: Filter) => void
	onAdd: () => void
}) {
	return (
		<VStack align="stretch" gap={3}>
			<HStack
				justify="space-between"
				flexWrap="wrap"
				gap={3}
				align="flex-start"
			>
				<Box>
					<Heading size="md">{formatMonthHeading(month)}</Heading>
				</Box>
				<HStack flexWrap="wrap" gap={2}>
					<Button
						size="sm"
						variant="outline"
						borderColor="#cad6cf"
						onClick={onPrev}
					>
						‹
					</Button>
					<Button
						size="sm"
						bg="#d8ebff"
						color="#123a5f"
						border="1px solid #a9cff5"
						_hover={{ bg: "#c8e2ff" }}
						onClick={onToday}
					>
						Today
					</Button>
					<Button
						size="sm"
						variant="outline"
						borderColor="#cad6cf"
						onClick={onNext}
					>
						›
					</Button>
					<Button
						size="sm"
						bg="#90d5ff"
						color="#163447"
						_hover={{ bg: "#78c9fb" }}
						onClick={onAdd}
					>
						+ Add event
					</Button>
				</HStack>
			</HStack>
			<HStack gap={2} flexWrap="wrap">
				<FilterBtn
					active={filter === "all"}
					onClick={() => onFilter("all")}
					label="All events"
				/>
				<FilterBtn
					active={filter === "building"}
					onClick={() => onFilter("building")}
					label="Everyone (building)"
				/>
				<FilterBtn
					active={filter === "section"}
					onClick={() => onFilter("section")}
					label="This section"
				/>
			</HStack>
			<HStack gap={3} flexWrap="wrap" fontSize="xs" color="#506057">
				<HStack gap={1.5} align="center">
					<Box
						w="14px"
						h="14px"
						borderRadius="4px"
						bg="#1d4ed8"
						boxShadow="inset 3px 0 0 0 #93c5fd"
					/>
					<Text>Building-wide</Text>
				</HStack>
				<HStack gap={1.5} align="center">
					<Box
						w="14px"
						h="14px"
						borderRadius="4px"
						bg="#047857"
						boxShadow="inset 3px 0 0 0 #6ee7b7"
					/>
					<Text>This section only</Text>
				</HStack>
			</HStack>
		</VStack>
	)
}

// TODO move to separate component
function FilterBtn({
	active,
	onClick,
	label,
}: {
	active: boolean
	onClick: () => void
	label: string
}) {
	return (
		<Button
			size="sm"
			bg={active ? "#d8ebff" : "white"}
			color="#123a5f"
			border="1px solid"
			borderColor={active ? "#a9cff5" : "#d2deea"}
			_hover={{ bg: active ? "#d8ebff" : "#f4f9ff" }}
			onClick={onClick}
		>
			{label}
		</Button>
	)
}
