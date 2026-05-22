import HouseRuleCreate from "@/shared/types/house-rule/houseRule.create"
import HouseRuleDto from "@/shared/types/house-rule/houseRule.dto"
import HouseRuleUpdate from "@/shared/types/house-rule/houseRule.update"
import HouseRuleCategoryDto from "@/shared/types/house-rule-category/houseRuleCategory.dto"
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

const MAX_RULE_DESCRIPTION_LENGTH = 500

export type RuleDraft = HouseRuleDto | RuleCreateDraft

export type RuleCreateDraft = {
	buildingId: number
	title: string
	body: string
	sortOrder: number
	categoryMap: HouseRuleCategoryDto[]
}

type FormProps = {
	draft: RuleDraft
	categories: HouseRuleCategoryDto[]
	onClose: () => void
	onCreate: (payload: HouseRuleCreate) => void
	onUpdate: (id: number, payload: HouseRuleUpdate) => void
	onDelete: (id: number) => void
}

type OverlayProps = Omit<FormProps, "draft"> & {
	open: boolean
	draft: RuleDraft | null
}

const fieldStyle = {
	width: "100%",
	borderRadius: "12px",
	border: "1px solid #d5e3f3",
	padding: "8px 12px",
	fontSize: "1rem",
	background: "white",
	color: "#234567",
} as const

function isExistingRule(draft: RuleDraft): draft is HouseRuleDto {
	return "id" in draft && typeof draft.id === "number"
}

function draftFormKey(draft: RuleDraft) {
	return isExistingRule(draft) ? `edit-${draft.id}` : "new"
}

function RuleEditorForm({
	draft,
	categories,
	onClose,
	onCreate,
	onUpdate,
	onDelete,
}: FormProps) {
	const [title, setTitle] = useState(draft.title)
	const [body, setBody] = useState(draft.body)
	const [sortOrder, setSortOrder] = useState(draft.sortOrder)
	const [categoryIds, setCategoryIds] = useState<number[]>(
		draft.categoryMap.map((category) =>
			"houseRuleCategoryId" in category
				? category.houseRuleCategoryId
				: category.id,
		),
	)
	const [error, setError] = useState<string | null>(null)

	const editing = isExistingRule(draft)

	function toggleCategory(id: number) {
		setCategoryIds((prev) =>
			prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
		)
	}

	function handleSave() {
		const trimmedTitle = title.trim()
		const trimmedBody = body.trim()
		if (!trimmedTitle) {
			setError("Add a title.")
			return
		}
		if (!trimmedBody) {
			setError("Add a description.")
			return
		}
		if (categoryIds.length === 0) {
			setError("Select at least one category.")
			return
		}

		const payload = {
			title: trimmedTitle,
			body: trimmedBody,
			sortOrder,
			categoryIds,
		}

		if (editing) {
			onUpdate(draft.id, payload)
		} else {
			onCreate({
				...payload,
				buildingId: draft.buildingId,
			})
		}
		onClose()
	}

	return (
		<Box
			bg="rgba(255,255,255,0.98)"
			borderRadius="22px"
			border="1px solid #dce8f6"
			p={6}
			maxW="520px"
			w="full"
			boxShadow="0 20px 50px rgba(20, 30, 45, 0.25)"
			onClick={(e) => e.stopPropagation()}
		>
			<Heading size="md" mb={4} color="#274d72">
				{editing ? "Edit rule" : "New rule"}
			</Heading>
			<VStack align="stretch" gap={3}>
				<Box>
					<Text fontSize="sm" color="#4b6177" mb={1}>
						Title
					</Text>
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="e.g. Quiet hours"
						borderColor="#d5e3f3"
						_focusVisible={{ borderColor: "#a9cff5" }}
					/>
				</Box>
				<Box>
					<Text fontSize="sm" color="#4b6177" mb={1}>
						Description
					</Text>
					<textarea
						rows={4}
						maxLength={MAX_RULE_DESCRIPTION_LENGTH}
						value={body}
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
							setBody(e.target.value)
						}
						placeholder="Rule details"
						style={{
							...fieldStyle,
							resize: "none",
							height: "100px",
							overflowY: "auto",
						}}
					/>
					<Text
						fontSize="xs"
						color="#4b6177"
						mt={1}
						textAlign="right"
					>
						{body.length}/{MAX_RULE_DESCRIPTION_LENGTH}
					</Text>
				</Box>
				<Box>
					<Text fontSize="sm" color="#4b6177" mb={1}>
						Sort order
					</Text>
					<Input
						type="number"
						min={1}
						value={sortOrder}
						onChange={(e) =>
							setSortOrder(Number(e.target.value) || 1)
						}
						borderColor="#d5e3f3"
						_focusVisible={{ borderColor: "#a9cff5" }}
					/>
				</Box>
				<Box>
					<Text fontSize="sm" color="#4b6177" mb={1}>
						Categories
					</Text>
					<VStack align="stretch" gap={2}>
						{categories.map((category) => (
							<label
								key={category.id}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
									color: "#506057",
								}}
							>
								<input
									type="checkbox"
									checked={categoryIds.includes(category.id)}
									onChange={() => toggleCategory(category.id)}
								/>
								{category.name}
							</label>
						))}
					</VStack>
					<Text fontSize="xs" color="#4b6177" mt={1}>
						Separate multiple categories with commas.
					</Text>
				</Box>
				{error ? (
					<Text fontSize="sm" color="#9b2c2c">
						{error}
					</Text>
				) : null}
				<HStack justify="space-between" flexWrap="wrap" gap={3} pt={2}>
					{editing ? (
						<Button
							bg="#ffecee"
							color="#8a2d3b"
							border="1px solid"
							borderColor="#f5c2c7"
							fontWeight="normal"
							_hover={{ bg: "#ffecee", borderColor: "#f5c2c7" }}
							_active={{ bg: "#ffecee", borderColor: "#f5c2c7" }}
							onClick={() => {
								onDelete(draft.id)
								onClose()
							}}
						>
							Delete
						</Button>
					) : (
						<Box />
					)}
					<HStack gap={2}>
						<Button
							bg="white"
							color="#123a5f"
							border="1px solid"
							borderColor="#d2deea"
							fontWeight="normal"
							_hover={{ bg: "white", borderColor: "#d2deea" }}
							_active={{ bg: "white", borderColor: "#d2deea" }}
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							bg="#d8ebff"
							color="#123a5f"
							_hover={{ bg: "#c8e2ff" }}
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

export default function RuleEditorOverlay({
	open,
	draft,
	categories,
	onClose,
	onCreate,
	onUpdate,
	onDelete,
}: OverlayProps) {
	if (!open || !draft) return null

	return (
		<Box
			position="fixed"
			inset={0}
			bg="rgba(20, 30, 45, 0.55)"
			zIndex={1000}
			display="flex"
			alignItems="center"
			justifyContent="center"
			p={4}
			onClick={onClose}
		>
			<RuleEditorForm
				key={draftFormKey(draft)}
				draft={draft}
				categories={categories}
				onClose={onClose}
				onCreate={onCreate}
				onUpdate={onUpdate}
				onDelete={onDelete}
			/>
		</Box>
	)
}
