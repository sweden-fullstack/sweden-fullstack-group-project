import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import {
	formatDayRangeInMonth,
	formatMonthHeading,
} from "@/features/section/utils/formatTimes"
import CalendarFilterButton from "./CalendarFilterButton"

export type CalendarFilter = "all" | "building" | "section"

type Props = {
	month: Date
	onPrev: () => void
	onNext: () => void
	onToday: () => void
	filter: CalendarFilter
	onFilter: (f: CalendarFilter) => void
	onAdd: () => void
}

export default function CalendarHeader({
	month,
	onPrev,
	onNext,
	onToday,
	filter,
	onFilter,
	onAdd,
}: Props) {
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
				<HStack flexWrap="wrap" gap={2} align="center">
					<Button
						size="sm"
						bg="white"
						color="#123a5f"
						border="1px solid"
						borderColor="#d2deea"
						fontWeight="normal"
						minW="8"
						px={2}
						fontSize="lg"
						lineHeight="1"
						_hover={{ bg: "white", borderColor: "#d2deea" }}
						_active={{ bg: "white", borderColor: "#d2deea" }}
						onClick={onPrev}
					>
						‹
					</Button>
					<Button
						size="sm"
						bg="#d8ebff"
						color="#123a5f"
						border="1px solid"
						borderColor="#a9cff5"
						fontWeight="normal"
						_hover={{ bg: "#d8ebff", borderColor: "#a9cff5" }}
						_active={{ bg: "#d8ebff", borderColor: "#a9cff5" }}
						onClick={onToday}
					>
						Today
					</Button>
					<Button
						size="sm"
						bg="white"
						color="#123a5f"
						border="1px solid"
						borderColor="#d2deea"
						fontWeight="normal"
						minW="8"
						px={2}
						fontSize="lg"
						lineHeight="1"
						_hover={{ bg: "white", borderColor: "#d2deea" }}
						_active={{ bg: "white", borderColor: "#d2deea" }}
						onClick={onNext}
					>
						›
					</Button>
					<Button
						size="sm"
						bg="#d8ebff"
						color="#123a5f"
						border="1px solid"
						borderColor="#a9cff5"
						fontWeight="normal"
						_hover={{ bg: "#d8ebff", borderColor: "#a9cff5" }}
						_active={{ bg: "#d8ebff", borderColor: "#a9cff5" }}
						onClick={onAdd}
					>
						+ Add event
					</Button>
				</HStack>
			</HStack>
			<Text fontSize="sm" color="#4b6177">
				{formatDayRangeInMonth(month)}
			</Text>
			<HStack gap={2} flexWrap="wrap">
				<CalendarFilterButton
					active={filter === "all"}
					onClick={() => onFilter("all")}
					label="All events"
				/>
				<CalendarFilterButton
					active={filter === "building"}
					onClick={() => onFilter("building")}
					label="Everyone (building)"
				/>
				<CalendarFilterButton
					active={filter === "section"}
					onClick={() => onFilter("section")}
					label="My section"
				/>
			</HStack>
			<HStack gap={3} flexWrap="wrap" fontSize="xs" color="#4b6177">
				<HStack gap={1.5} align="center">
					<Box w="14px" h="14px" borderRadius="4px" bg="#3b82f6" />
					<Text>Building-wide</Text>
				</HStack>
				<HStack gap={1.5} align="center">
					<Box w="14px" h="14px" borderRadius="4px" bg="#10b981" />
					<Text>My section only</Text>
				</HStack>
			</HStack>
		</VStack>
	)
}
