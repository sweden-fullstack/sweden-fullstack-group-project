import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import type { MyDutyEntry } from "../types"
import { formatDate } from "../utils/date"

type Props = {
	entries: MyDutyEntry[]
}

export default function MyDutySchedule({ entries }: Props) {
	return (
		<>
			<Heading size="sm" mb={2}>
				My cleaning schedule
			</Heading>
			<Text color="#506057" mb={4}>
				All dates where you are assigned duties.
			</Text>
			<VStack align="stretch" gap={3}>
				{entries.length ? (
					entries.map((entry) => (
						<Box
							key={entry.dateKey}
							border="1px solid #d5e3f3"
							borderRadius="12px"
							p={3}
							bg="#f9fcff"
						>
							<Text
								fontSize="sm"
								fontWeight="semibold"
								color="#274d72"
								mb={2}
							>
								{formatDate(entry.dateKey)}
							</Text>
							<Text color="#355270">
								{entry.tasks.join(" • ")}
							</Text>
						</Box>
					))
				) : (
					<Text color="#718176">
						You do not have assigned duties yet.
					</Text>
				)}
			</VStack>
		</>
	)
}
