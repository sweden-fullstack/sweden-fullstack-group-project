import { Button, Heading, HStack, Input, Box } from "@chakra-ui/react"

type Props = {
	newTaskName: string
	onChangeTaskName: (value: string) => void
	onAddTask: () => void
}

export default function AddTaskCard({
	newTaskName,
	onChangeTaskName,
	onAddTask,
}: Props) {
	return (
		<Box
			bg="rgba(255,255,255,0.92)"
			border="1px solid #dce8f6"
			borderRadius="22px"
			p={5}
			boxShadow="0 8px 24px rgba(43, 107, 176, 0.08)"
		>
			<Heading size="sm" mb={3}>
				Add a cleaning task
			</Heading>
			<HStack align="stretch" flexWrap="wrap" gap={2}>
				<Input
					value={newTaskName}
					onChange={(event) => onChangeTaskName(event.target.value)}
					placeholder="e.g. Toilet B, hallway, recycling"
					flex="1"
					minW="200px"
				/>
				<Button
					bg="#d8ebff"
					color="#123a5f"
					_hover={{ bg: "#c8e2ff" }}
					onClick={onAddTask}
				>
					Add task
				</Button>
			</HStack>
		</Box>
	)
}
