import RulesApi from "@/api/rules"
import AppShell from "@/components/AppShell"
import RuleCard from "@/features/rules/components/RuleCard"
import HouseRuleCategoryDto from "@/shared/types/house-rule-category/houseRuleCategory.dto"
import RuleEditorOverlay, {
	type RuleCreateDraft,
	type RuleDraft,
} from "@/features/rules/components/RuleEditorOverlay"
import { canManageRules } from "@/features/rules/utils/canManageRules"
import useUserStore from "@/stores/userStore"
import HouseRuleCreate from "@/shared/types/house-rule/houseRule.create"
import HouseRuleDto from "@/shared/types/house-rule/houseRule.dto"
import HouseRuleUpdate from "@/shared/types/house-rule/houseRule.update"
import UserDto from "@/shared/types/user/user.dto"
import { Box, Button, Grid, Spinner, Text, VStack } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

export default function RulesPage() {
	const { getUserSelf } = useUserStore()
	const [currentUser, setCurrentUser] = useState<UserDto | undefined>(
		undefined,
	)
	const [rules, setRules] = useState<HouseRuleDto[]>([])
	const [categories, setCategories] = useState<HouseRuleCategoryDto[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [editorDraft, setEditorDraft] = useState<RuleDraft | null>(null)

	const buildingId = currentUser?.buildingId ?? 1
	const canManage = canManageRules(currentUser?.role)

	const refreshRules = useCallback(async (buildingIdValue: number) => {
		const data = await RulesApi.getByBuilding(buildingIdValue)
		setRules(data)
	}, [])

	useEffect(() => {
		async function loadPageData() {
			try {
				const self = await getUserSelf()
				setCurrentUser(self)
				const resolvedBuildingId = self?.buildingId ?? 1
				const [rulesData, categoriesData] = await Promise.all([
					RulesApi.getByBuilding(resolvedBuildingId),
					RulesApi.getCategories(),
				])
				setRules(rulesData)
				setCategories(categoriesData)
			} catch {
				setError("Could not load house rules.")
			} finally {
				setIsLoading(false)
			}
		}

		void loadPageData()
	}, [getUserSelf])

	function openCreateEditor() {
		const nextSortOrder =
			rules.reduce((max, rule) => Math.max(max, rule.sortOrder), 0) + 1
		const draft: RuleCreateDraft = {
			buildingId,
			title: "",
			body: "",
			sortOrder: nextSortOrder || 1,
			categoryIds: [],
		}
		setEditorDraft(draft)
	}

	function openEditEditor(rule: HouseRuleDto) {
		setEditorDraft(rule)
	}

	function closeEditor() {
		setEditorDraft(null)
	}

	async function handleCreate(payload: HouseRuleCreate) {
		try {
			await RulesApi.create(payload)
			await refreshRules(buildingId)
		} catch {
			setError("Could not create rule.")
		}
	}

	async function handleUpdate(id: number, payload: HouseRuleUpdate) {
		try {
			await RulesApi.update(id, payload)
			await refreshRules(buildingId)
		} catch {
			setError("Could not update rule.")
		}
	}

	async function handleDelete(id: number) {
		try {
			await RulesApi.delete(id)
			await refreshRules(buildingId)
		} catch {
			setError("Could not delete rule.")
		}
	}

	function handleDeleteFromCard(rule: HouseRuleDto) {
		if (!window.confirm(`Delete "${rule.title}"?`)) return
		void handleDelete(rule.id)
	}

	return (
		<AppShell
			title="House rules"
			description="Find shared rules, emergency notes, and important dorm information in one place."
		>
			{isLoading ? (
				<Spinner />
			) : error ? (
				<Text color="#9b2c2c">{error}</Text>
			) : (
				<VStack align="stretch" gap={6} minW={0} w="full">
					{canManage ? (
						<Box>
							<Button
								bg="#d8ebff"
								color="#123a5f"
								_hover={{ bg: "#c8e2ff" }}
								onClick={openCreateEditor}
							>
								Add rule
							</Button>
						</Box>
					) : null}
					{rules.length === 0 ? (
						<Text color="#4b6177">
							No house rules for this building yet.
						</Text>
					) : (
						<Grid
							minW={0}
							w="full"
							templateColumns="minmax(0, 1fr)"
							gap={5}
							bg="linear-gradient(180deg, #f7fbff 0%, #f0f6ff 100%)"
							border="1px solid #dce8f6"
							borderRadius="24px"
							p={{ base: 3, md: 4 }}
							overflow="hidden"
						>
							{rules.map((rule) => (
								<RuleCard
									key={rule.id}
									rule={rule}
									canManage={canManage}
									onEdit={openEditEditor}
									onDelete={handleDeleteFromCard}
								/>
							))}
						</Grid>
					)}
				</VStack>
			)}
			{canManage ? (
				<RuleEditorOverlay
					open={editorDraft !== null}
					draft={editorDraft}
					categories={categories}
					onClose={closeEditor}
					onCreate={handleCreate}
					onUpdate={handleUpdate}
					onDelete={handleDelete}
				/>
			) : null}
		</AppShell>
	)
}

export const Component = RulesPage
