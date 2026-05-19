import { Box, chakra } from "@chakra-ui/react"
import { formatTimeShort } from "../../utils/formatTimes"
import { eventPillColors } from "./eventColors"
import { truncateEventTitle } from "./truncateEventTitle"
import type { SectionCalendarEvent } from "../../types"

type Props = {
	event: SectionCalendarEvent
	titleMaxChars: number | null
	onSelect: () => void
}

export default function CalendarEventMarker({
	event,
	titleMaxChars,
	onSelect,
}: Props) {
	const start = new Date(event.startTime)
	const colors = eventPillColors(event)
	const label = `${event.title} ${formatTimeShort(start)}`
	const fullTitle = titleMaxChars === null

	return (
		<chakra.button
			type="button"
			w="100%"
			maxW="100%"
			minW={0}
			boxSizing="border-box"
			h="auto"
			minH="22px"
			py={1.5}
			px={2}
			fontWeight="semibold"
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
			letterSpacing="0.01em"
			_hover={{ filter: "brightness(0.97)" }}
			onClick={onSelect}
		>
			<Box
				as="span"
				display="block"
				w="100%"
				overflow="hidden"
				whiteSpace={fullTitle ? "normal" : "nowrap"}
				wordBreak={fullTitle ? "break-word" : "normal"}
			>
				{fullTitle ? (
					<>
						{event.title}
						<Box
							as="span"
							display="block"
							fontSize="10px"
							fontWeight="normal"
							opacity={0.92}
							mt={0.5}
							lineHeight="1.3"
						>
							{formatTimeShort(start)}
						</Box>
					</>
				) : (
					truncateEventTitle(event.title, titleMaxChars)
				)}
			</Box>
		</chakra.button>
	)
}
