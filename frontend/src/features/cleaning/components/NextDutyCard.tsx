import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import type { NextMyDuty } from "../types"
import { formatDate } from "../utils/date"

type Props = {
	nextMyDuty: NextMyDuty | null
}

export default function NextDutyCard({ nextMyDuty }: Props) {
	return (
		<Box
			bg="linear-gradient(180deg, #f7fbff 0%, #edf5ff 100%)"
			border="1px solid #d7e7fb"
			borderRadius="22px"
			p={5}
		>
			<Heading size="sm" mb={2}>
				Your next duty is...
			</Heading>
			{nextMyDuty ? (
				<VStack align="stretch" gap={1}>
					<Text color="#234567" fontWeight="semibold">
						{formatDate(nextMyDuty.dateKey)}
					</Text>
					<Text color="#3c5975">{nextMyDuty.tasks.join(" • ")}</Text>
				</VStack>
			) : (
				<Text color="#4b6177">
					No upcoming duties are assigned to you yet.
				</Text>
			)}
		</Box>
	)
}
