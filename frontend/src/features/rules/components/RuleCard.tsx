import HouseRuleDto from "@/shared/types/house-rule/houseRule.dto"
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/react"

const wrapTextProps = {
	minW: 0,
	maxW: "100%",
	wordBreak: "break-word" as const,
	overflowWrap: "anywhere" as const,
}

type RuleCardProps = {
	rule: HouseRuleDto
	canManage: boolean
	onEdit: (rule: HouseRuleDto) => void
	onDelete: (rule: HouseRuleDto) => void
}

export default function RuleCard({
	rule,
	canManage,
	onEdit,
	onDelete,
}: RuleCardProps) {
	return (
		<Box
			minW={0}
			maxW="100%"
			w="full"
			bg="rgba(255,255,255,0.92)"
			border="1px solid #dce8f6"
			borderRadius="22px"
			p={5}
			boxShadow="0 8px 24px rgba(43, 107, 176, 0.08)"
		>
			<VStack align="stretch" gap={2} minW={0}>
				<Flex
					justify="space-between"
					align="flex-start"
					gap={2}
					flexWrap="wrap"
				>
					{rule.categoryMap.length > 0 ? (
						<HStack gap={2} flexWrap="wrap" flex="1" minW={0}>
							{rule.categoryMap.map((category) => (
								<Text
									key={category.houseRuleCategoryId}
									fontSize="sm"
									bg="#e8f3ff"
									color="#274d72"
									borderRadius="999px"
									px={3}
									py={1}
								>
									{category.houseRuleCategoryName}
								</Text>
							))}
						</HStack>
					) : (
						<Box flex="1" />
					)}
					{canManage ? (
						<HStack gap={1} flexShrink={0} alignSelf="flex-start">
							<Button
								size="xs"
								bg="white"
								color="#123a5f"
								border="1px solid"
								borderColor="#d2deea"
								fontWeight="normal"
								_hover={{ bg: "white", borderColor: "#d2deea" }}
								_active={{
									bg: "white",
									borderColor: "#d2deea",
								}}
								onClick={() => onEdit(rule)}
							>
								Edit
							</Button>
							<Button
								size="xs"
								bg="#ffecee"
								color="#8a2d3b"
								border="1px solid"
								borderColor="#f5c2c7"
								fontWeight="normal"
								_hover={{
									bg: "#ffecee",
									borderColor: "#f5c2c7",
								}}
								_active={{
									bg: "#ffecee",
									borderColor: "#f5c2c7",
								}}
								onClick={() => onDelete(rule)}
							>
								Delete
							</Button>
						</HStack>
					) : null}
				</Flex>
				<Heading size="md" color="#234567" {...wrapTextProps}>
					{rule.title}
				</Heading>
				<Text color="#3c5975" whiteSpace="pre-wrap" {...wrapTextProps}>
					{rule.body}
				</Text>
				<Text fontSize="sm" color="#4b6177" {...wrapTextProps}>
					Updated {new Date(rule.updatedAt).toLocaleDateString()}
				</Text>
			</VStack>
		</Box>
	)
}
