import {
	Box,
	Button,
	Heading,
	HStack,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react"
import { type ChangeEvent, useState } from "react"
import {
	parseLocalDatetimeInputValue,
	toLocalDatetimeInputValue,
} from "@/utils/date"
import { VISIBILITY_OPTIONS } from "@/features/section/utils/eventVisibility"
import SectionEventType from "../../../../../shared/types/section-event/sectionEventType"
import SectionDto from "@/shared/types/section/section.dto"
import { SectionEventVisibility } from "@/shared/types/section-event/sectionEvent.dto"
import EventDraft from "../types"
import SectionEventApi from "@/api/sectionEvent"
import SectionEventCreate from "@/shared/types/section-event/sectionEvent.create"
import SectionEventUpdate from "@/shared/types/section-event/sectionEvent.update"

type FormProps = {
	draft: EventDraft
	section: SectionDto
	// sectionId: number
	refreshSectionData: () => Promise<void>
	onCloseDraftEditor: () => void
	// onCreate: (payload: SectionEventCreate) => void
	// onUpdate: (event: SectionEventDto) => void
	// onDelete: (id: number) => void
}

type OverlayProps = Omit<FormProps, "draft"> & {
	open: boolean
	draft: EventDraft | null
}

const fieldStyle = {
	width: "100%",
	borderRadius: "12px",
	border: "1px solid #cad6cf",
	padding: "8px 12px",
	fontSize: "1rem",
	background: "white",
} as const

function isExistingEvent(draft: EventDraft) {
	return draft && draft.id
}

function draftFormKey(draft: EventDraft) {
	return isExistingEvent(draft) ? `edit-${draft.id}` : "new"
}

function EventEditorForm({
	draft,
	section,
	// sectionId,
	onCloseDraftEditor,
	refreshSectionData,
	// onCreate,
	// onUpdate,
	// onDelete,
}: FormProps) {
	const [title, setTitle] = useState(draft.dto.title)
	const [visibility, setVisibility] =
		useState<SectionEventVisibility>("building")
	const [startAt, setStartAt] = useState<Date | null>(
		() => new Date(draft.dto.startTime),
	)
	const [endAt, setEndAt] = useState<Date | null>(
		() => new Date(draft.dto.endTime),
	)
	const [description, setDescription] = useState(draft.dto.description ?? "")
	const [error, setError] = useState<string | null>(null)

	const editing = isExistingEvent(draft)

	async function onDelete(id: number) {
		await SectionEventApi.delete(id)
		await refreshSectionData()
	}

	async function onCreate(dto: SectionEventCreate, sectionId?: number) {
		await SectionEventApi.create(dto, sectionId)
		await refreshSectionData()
	}

	async function onUpdate(dto: SectionEventUpdate, id?: number) {
		await SectionEventApi.update(dto, id)
		await refreshSectionData()
	}

	function handleSave() {
		const trimmed = title.trim()
		if (!trimmed) {
			setError("Add a title.")
			return
		}
		if (!startAt || !endAt) {
			setError("Fix the dates.")
			return
		}
		if (endAt <= startAt) {
			setError("End time must be after start.")
			return
		}

		const base = {
			title: trimmed,
			eventTypeId: SectionEventType.Maintenance,
			startTime: startAt,
			endTime: endAt,
			description: description.trim() || undefined,
			buildingId: section.buildingId,
		}

		const sectionIdValue = visibility === "section" ? section.id : undefined

		if (editing) {
			onUpdate(
				{
					...draft.dto,
					...base,
					sectionId: sectionIdValue ?? null,
				},
				draft.id,
			)
		} else {
			onCreate(
				{
					...base,
					sectionId: sectionIdValue,
				},
				sectionIdValue,
			)
		}
		onCloseDraftEditor()
	}

	return (
		<Box
			bg="white"
			borderRadius="22px"
			border="1px solid #dce5df"
			p={6}
			maxW="520px"
			w="full"
			boxShadow="0 24px 60px rgba(54, 74, 62, 0.18)"
			onClick={(e) => e.stopPropagation()}
		>
			<Heading size="md" mb={4}>
				{editing ? "Edit event" : "New event"}
			</Heading>
			<VStack align="stretch" gap={3}>
				<Box>
					<Text fontSize="sm" color="#506057" mb={1}>
						Title
					</Text>
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="e.g. Corridor dinner"
					/>
				</Box>
				<Box>
					<Text fontSize="sm" color="#506057" mb={1}>
						Who can see it
					</Text>
					<select
						value={visibility}
						onChange={(e: ChangeEvent<HTMLSelectElement>) =>
							setVisibility(
								e.target.value as SectionEventVisibility,
							)
						}
						style={fieldStyle}
					>
						{VISIBILITY_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</Box>
				<HStack gap={4} flexWrap="wrap" align="flex-start">
					<Box flex="1" minW="200px">
						<Text fontSize="sm" color="#506057" mb={1}>
							Starts
						</Text>
						<Input
							type="datetime-local"
							value={
								startAt
									? toLocalDatetimeInputValue(startAt)
									: ""
							}
							onChange={(e) =>
								setStartAt(
									parseLocalDatetimeInputValue(
										e.target.value,
									),
								)
							}
						/>
					</Box>
					<Box flex="1" minW="200px">
						<Text fontSize="sm" color="#506057" mb={1}>
							Ends
						</Text>
						<Input
							type="datetime-local"
							value={
								endAt ? toLocalDatetimeInputValue(endAt) : ""
							}
							onChange={(e) =>
								setEndAt(
									parseLocalDatetimeInputValue(
										e.target.value,
									),
								)
							}
						/>
					</Box>
				</HStack>
				<Box>
					<Text fontSize="sm" color="#506057" mb={1}>
						Details
					</Text>
					<textarea
						rows={4}
						value={description}
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
							setDescription(e.target.value)
						}
						placeholder="Optional notes"
						style={{
							...fieldStyle,
							resize: "vertical",
							minHeight: "100px",
						}}
					/>
				</Box>
				{error ? (
					<Text fontSize="sm" color="#9b2c2c">
						{error}
					</Text>
				) : null}
				<HStack justify="space-between" flexWrap="wrap" gap={3} pt={2}>
					{editing ? (
						<Button
							variant="outline"
							borderColor="#d9a3a3"
							color="#7a2323"
							_hover={{ bg: "#fff5f5" }}
							onClick={() => {
								onDelete(draft.id!)
								onCloseDraftEditor()
							}}
						>
							Delete
						</Button>
					) : (
						<Box />
					)}
					<HStack gap={2}>
						<Button
							borderColor="#d9a3a3"
							color="#7a2323"
							_hover={{ bg: "#fff5f5" }}
							variant="outline"
							onClick={onCloseDraftEditor}
						>
							Cancel
						</Button>
						<Button
							bg="#90d5ff"
							color="#163447"
							_hover={{ bg: "#78c9fb" }}
							onClick={handleSave}
						>
							Save
						</Button>
					</HStack>
				</HStack>
			</VStack>
		</Box>
	)
}

export default function EventEditorOverlay({
	open,
	draft,
	section,
	onCloseDraftEditor,
	refreshSectionData,
}: OverlayProps) {
	if (!open || !draft) return null

	return (
		<Box
			position="fixed"
			inset={0}
			bg="rgba(30, 42, 36, 0.4)"
			zIndex={1000}
			display="flex"
			alignItems="center"
			justifyContent="center"
			p={4}
			onClick={onCloseDraftEditor}
		>
			<EventEditorForm
				key={draftFormKey(draft)}
				draft={draft}
				section={section}
				onCloseDraftEditor={onCloseDraftEditor}
				refreshSectionData={refreshSectionData}
			/>
		</Box>
	)
}
