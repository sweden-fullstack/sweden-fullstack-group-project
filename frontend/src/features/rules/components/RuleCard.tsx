import HouseRuleDto from "@/shared/types/house-rule/houseRule.dto"
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"

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
		<Box bg="white" border="1px solid #dce5df" borderRadius="22px" p={5}>
			<VStack align="stretch" gap={2}>
				<HStack justify="space-between" align="flex-start">
					<Text fontSize="sm" color="#718176">
						{rule.categoryNames.join(", ")}
					</Text>
					{canManage ? (
						<HStack gap={1} flexShrink={0}>
							<Button
								size="xs"
								variant="outline"
								onClick={() => onEdit(rule)}
							>
								Edit
							</Button>
							<Button
								size="xs"
								variant="outline"
								borderColor="#d9a3a3"
								color="#7a2323"
								_hover={{ bg: "#fff5f5" }}
								onClick={() => onDelete(rule)}
							>
								Delete
							</Button>
						</HStack>
					) : null}
				</HStack>
				<Heading size="md">{rule.title}</Heading>
				<Text color="#506057">{rule.body}</Text>
				<Text fontSize="sm" color="#718176">
					Updated {rule.updatedAt}
				</Text>
			</VStack>
		</Box>
	)
}
