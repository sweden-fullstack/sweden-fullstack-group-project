import SectionApi, { type SectionDetails } from "@/api/section"
import AppShell from "@/components/AppShell"
import {
	Box,
	Grid,
	Heading,
	HStack,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import SectionEventCalendar from "@/features/section/components/SectionEventCalendar"
import { useSectionCalendarEvents } from "@/features/section/hooks/useSectionCalendarEvents"
import { pickNearestSectionOnlyEvent } from "@/features/section/utils/pickNearestSectionOnlyEvent"
import useUserStore from "@/stores/userStore"
import { formatTimeRange } from "@/features/section/calendar/formatTimes"

export default function SectionPage() {
	const [section, setSection] = useState<SectionDetails | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { getUserSelf } = useUserStore()
	const [currentUserId, setCurrentUserId] = useState<number | null>(null)

	const seed = useMemo(
		() => section?.calendarEvents ?? [],
		[section?.calendarEvents],
	)

	const { events, upsert, remove, ready } = useSectionCalendarEvents(
		section?.id ?? null,
		seed,
	)

	const spotlight = useMemo(
		() => pickNearestSectionOnlyEvent(events),
		[events],
	)

	const spotlightIsPast = spotlight
		? new Date(spotlight.endTime).getTime() < Date.now()
		: false

	useEffect(() => {
		async function loadSection() {
			try {
				const data = await SectionApi.getCurrentSection()
				setSection(data)
			} catch {
				setError("Could not load section information.")
			} finally {
				setIsLoading(false)
			}
		}

		void loadSection()
	}, [])

	useEffect(() => {
		void (async () => {
			const self = await getUserSelf()
			setCurrentUserId(self?.id ?? null)
		})()
	}, [getUserSelf])

	return (
		<AppShell
			title="Section"
			description="Residents in your corridor, the next section gathering, and a shared calendar for building-wide and section-only plans."
		>
			{isLoading ? (
				<Spinner />
			) : error ? (
				<Text color="#9b2c2c">{error}</Text>
			) : section ? (
				<VStack align="stretch" gap={8}>
					<Box
						bg="#f8fbff"
						border="1px solid #deefff"
						borderRadius="22px"
						p={5}
					>
						<Heading size="md" mb={2}>
							{section.name}
						</Heading>
						<Text color="#506057">
							{section.building} · {section.description}
						</Text>
					</Box>

					<Box>
						<Heading size="md" mb={4}>
							Student residents
						</Heading>
						<Grid
							templateColumns={{
								base: "1fr",
								md: "repeat(2, 1fr)",
							}}
							gap={4}
						>
							{section.residents.map((resident) => {
								const isYou = currentUserId === resident.id
								return (
									<Box
										key={resident.id}
										bg="white"
										border="1px solid #dce5df"
										borderRadius="22px"
										p={5}
										boxShadow={
											isYou
												? "0 0 0 2px #90d5ff, 0 12px 28px rgba(83, 130, 182, 0.12)"
												: "none"
										}
									>
										<HStack
											justify="space-between"
											align="flex-start"
											mb={2}
										>
											<Text fontSize="sm" color="#718176">
												Room {resident.roomNumber}
											</Text>
											{isYou ? (
												<Text
													fontSize="xs"
													fontWeight="semibold"
													color="#163447"
													bg="#d8ebff"
													borderRadius="full"
													px={2}
													py={0.5}
												>
													You
												</Text>
											) : null}
										</HStack>
										<Heading size="md" mb={2}>
											{resident.fullName}
										</Heading>
										<Text
											color="#506057"
											fontSize="sm"
											mb={1}
										>
											{resident.email}
										</Text>
										<Text color="#506057">
											{resident.major}
										</Text>
										<Text color="#506057">
											{resident.stayPeriod}
										</Text>
										<HStack mt={3} gap={2} flexWrap="wrap">
											{resident.interests.map(
												(interest) => (
													<Text
														key={interest}
														fontSize="sm"
														bg="#edf7f1"
														color="#355243"
														borderRadius="999px"
														px={3}
														py={1}
													>
														{interest}
													</Text>
												),
											)}
										</HStack>
									</Box>
								)
							})}
						</Grid>
					</Box>

					<Box>
						<Heading size="md" mb={4}>
							Latest section-only event
						</Heading>
						{spotlight ? (
							<Box
								bg="white"
								border="1px solid #dce5df"
								borderRadius="22px"
								p={6}
							>
								<Heading size="md" mb={2}>
									{spotlight.title}
								</Heading>
								<Text color="#718176" fontSize="sm" mb={2}>
									{formatTimeRange(
										new Date(spotlight.startTime),
										new Date(spotlight.endTime),
									)}{" "}
									·{" "}
									{spotlightIsPast
										? "Most recent"
										: "Next up"}{" "}
									· this section only
								</Text>
								{spotlight.description ? (
									<Text color="#506057">
										{spotlight.description}
									</Text>
								) : null}
							</Box>
						) : (
							<Text color="#718176">
								No section-only events on the calendar yet.
							</Text>
						)}
					</Box>

					<Box>
						<Heading size="md" mb={4}>
							Section calendar
						</Heading>
						{ready ? (
							<SectionEventCalendar
								sectionId={section.id}
								events={events}
								onUpsert={upsert}
								onRemove={remove}
							/>
						) : (
							<Spinner size="sm" />
						)}
					</Box>
				</VStack>
			) : null}
		</AppShell>
	)
}

export const Component = SectionPage
