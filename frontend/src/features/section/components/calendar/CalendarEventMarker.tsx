import { Box, chakra } from "@chakra-ui/react"
import { formatTimeShort } from "../../utils/formatTimes"
import { eventPillColors } from "./eventColors"
import type { SectionCalendarEvent } from "../../types"

type Props = {
	event: SectionCalendarEvent
	onSelect: () => void
}

export default function CalendarEventMarker({ event, onSelect }: Props) {
	const start = new Date(event.startTime)
	const colors = eventPillColors(event)
	const label = `${event.title} ${formatTimeShort(start)}`

	return (
		<chakra.button
			type="button"
			w="100%"
			maxW="100%"
			minW={0}
			boxSizing="border-box"
			h="auto"
			minH="22px"
			maxH="100px"
			fontWeight="semibold"
			overflow="hidden"
			textAlign="left"
			display="block"
			cursor="pointer"
			title={label}
			bg={colors.bg}
			color={colors.color}
			border="none"
			borderRadius="8px"
			lineHeight="1.35"
			fontSize="11px"
			py={1.5}
			px={2}
			letterSpacing="0.01em"
			_hover={{ filter: "brightness(0.97)" }}
			onClick={onSelect}
		>
			{event.title}
			<Box
				as="span"
				display="block"
				h="100%"
				fontSize="10px"
				fontWeight="normal"
				overflow="hidden"
				opacity={0.92}
				mt={0.5}
				lineHeight="1.3"
			>
				{formatTimeShort(start)}
			</Box>
		</chakra.button>
	)
}
