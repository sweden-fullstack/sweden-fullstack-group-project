import {
	Box,
	Button,
	Heading,
	HStack,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react"
import { type ChangeEvent, useEffect, useState } from "react"
import { toLocalDatetimeInputValue } from "../calendar/formatTimes"
import type { SectionCalendarEvent } from "../types"

const STORED_EVENT_TYPE = "section" as const

type Props = {
	open: boolean
	draft: SectionCalendarEvent | null
	onClose: () => void
	onSave: (event: SectionCalendarEvent) => void
	onDelete: (id: number) => void
}

const fieldStyle = {
	width: "100%",
	borderRadius: "12px",
	border: "1px solid #cad6cf",
	padding: "8px 12px",
	fontSize: "1rem",
	background: "white",
} as const

export default function EventEditorOverlay({
	open,
	draft,
	onClose,
	onSave,
	onDelete,
}: Props) {
	const [title, setTitle] = useState("")
	const [visibility, setVisibility] = useState<"building" | "section">(
		"section",
	)
	const [startLocal, setStartLocal] = useState("")
	const [endLocal, setEndLocal] = useState("")
	const [description, setDescription] = useState("")
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!draft) return
		setTitle(draft.title)
		setVisibility(draft.visibility)
		setStartLocal(toLocalDatetimeInputValue(new Date(draft.startTime)))
		setEndLocal(toLocalDatetimeInputValue(new Date(draft.endTime)))
		setDescription(draft.description ?? "")
		setError(null)
	}, [draft])

	if (!open || !draft) return null

	function handleSave() {
		const trimmed = title.trim()
		if (!trimmed) {
			setError("Add a title.")
			return
		}
		const start = new Date(startLocal)
		const end = new Date(endLocal)
		if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
			setError("Fix the dates.")
			return
		}
		if (end <= start) {
			setError("End time must be after start.")
			return
		}
		onSave({
			...draft,
			title: trimmed,
			eventType: STORED_EVENT_TYPE,
			visibility,
			startTime: start.toISOString(),
			endTime: end.toISOString(),
			description: description.trim() || undefined,
		})
		onClose()
	}

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
			onClick={onClose}
		>
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
					{draft.id < 0 ? "New event" : "Edit event"}
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
									e.target.value as "building" | "section",
								)
							}
							style={fieldStyle}
						>
							<option value="building">
								Everyone in the building
							</option>
							<option value="section">Only this section</option>
						</select>
					</Box>
					<HStack gap={4} flexWrap="wrap" align="flex-start">
						<Box flex="1" minW="200px">
							<Text fontSize="sm" color="#506057" mb={1}>
								Starts
							</Text>
							<Input
								type="datetime-local"
								value={startLocal}
								onChange={(e) => setStartLocal(e.target.value)}
							/>
						</Box>
						<Box flex="1" minW="200px">
							<Text fontSize="sm" color="#506057" mb={1}>
								Ends
							</Text>
							<Input
								type="datetime-local"
								value={endLocal}
								onChange={(e) => setEndLocal(e.target.value)}
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
					<HStack
						justify="space-between"
						flexWrap="wrap"
						gap={3}
						pt={2}
					>
						<Button
							variant="outline"
							borderColor="#d9a3a3"
							color="#7a2323"
							_hover={{ bg: "#fff5f5" }}
							onClick={() => {
								onDelete(draft.id)
								onClose()
							}}
						>
							Delete
						</Button>
						<HStack gap={2}>
							<Button variant="outline" onClick={onClose}>
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
		</Box>
	)
}
