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
						variant="ghost"
						minW="8"
						px={2}
						color="#506057"
						fontSize="lg"
						lineHeight="1"
						_hover={{ bg: "transparent", color: "#506057" }}
						_active={{ bg: "transparent" }}
						onClick={onPrev}
					>
						‹
					</Button>
					<Button
						size="sm"
						bg="#d8ebff"
						color="#123a5f"
						border="1px solid #a9cff5"
						_hover={{ bg: "#c8e2ff" }}
						onClick={onToday}
					>
						Today
					</Button>
					<Button
						size="sm"
						variant="ghost"
						minW="8"
						px={2}
						color="#506057"
						fontSize="lg"
						lineHeight="1"
						_hover={{ bg: "transparent", color: "#506057" }}
						_active={{ bg: "transparent" }}
						onClick={onNext}
					>
						›
					</Button>
					<Button
						size="sm"
						bg="#90d5ff"
						color="#163447"
						_hover={{ bg: "#78c9fb" }}
						onClick={onAdd}
					>
						+ Add event
					</Button>
				</HStack>
			</HStack>
			<Text fontSize="sm" color="#506057">
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
					label="This section"
				/>
			</HStack>
			<HStack gap={3} flexWrap="wrap" fontSize="xs" color="#506057">
				<HStack gap={1.5} align="center">
					<Box w="14px" h="14px" borderRadius="4px" bg="#3b82f6" />
					<Text>Building-wide</Text>
				</HStack>
				<HStack gap={1.5} align="center">
					<Box w="14px" h="14px" borderRadius="4px" bg="#10b981" />
					<Text>This section only</Text>
				</HStack>
			</HStack>
		</VStack>
	)
}
