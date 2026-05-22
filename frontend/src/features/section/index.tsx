import SectionApi, { type SectionDetails } from "@/api/section"
import AppShell from "@/components/AppShell"
import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react"
import SectionResidents from "@/features/section/components/SectionResidents"
import { useEffect, useMemo, useState } from "react"
import SectionEventCalendar from "@/features/section/components/SectionEventCalendar"
import { pickNearestSectionOnlyEvent } from "@/features/section/utils/pickNearestSectionOnlyEvent"
import useUserStore from "@/stores/userStore"
import { formatTimeRange } from "@/features/section/utils/formatTimes"
import useSectionCalendarStore from "@/features/section/stores/sectionCalendarStore"

export default function SectionPage() {
	const [section, setSection] = useState<SectionDetails | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { getUserSelf } = useUserStore()
	const [currentUserId, setCurrentUserId] = useState<number | null>(null)
	const [userSectionId, setUserSectionId] = useState(1)

	const { events, init, create, update, remove } = useSectionCalendarStore()

	useEffect(() => {
		async function loadSection() {
			try {
				const data = await SectionApi.getCurrentSection()
				setSection(data)
				init(data.id, data.calendarEvents)
			} catch {
				setError("Could not load section information.")
			} finally {
				setIsLoading(false)
			}
		}

		void loadSection()
	}, [init])

	useEffect(() => {
		void (async () => {
			const self = await getUserSelf()
			setCurrentUserId(self?.id ?? null)
			if (self?.sectionId) setUserSectionId(self.sectionId)
		})()
	}, [getUserSelf])

	const spotlight = useMemo(
		() => pickNearestSectionOnlyEvent(events),
		[events],
	)

	const spotlightIsPast = spotlight
		? new Date(spotlight.endTime).getTime() < Date.now()
		: false

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
				<VStack align="stretch" gap={6}>
					<Box
						bg="linear-gradient(180deg, #f7fbff 0%, #edf5ff 100%)"
						border="1px solid #d7e7fb"
						borderRadius="22px"
						p={5}
					>
						<Heading size="sm" mb={2}>
							{section.name}
						</Heading>
						<Text color="#3c5975">
							{section.building} · {section.description}
						</Text>
					</Box>

					<Box
						bg="linear-gradient(180deg, #f7fbff 0%, #edf5ff 100%)"
						border="1px solid #d7e7fb"
						borderRadius="22px"
						p={5}
					>
						<Heading size="sm" mb={2}>
							Latest section-only event
						</Heading>
						{spotlight ? (
							<VStack align="stretch" gap={1}>
								<Text color="#234567" fontWeight="semibold">
									{spotlight.title}
								</Text>
								<Text color="#3c5975" fontSize="sm">
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
									<Text color="#4b6177">
										{spotlight.description}
									</Text>
								) : null}
							</VStack>
						) : (
							<Text color="#4b6177">
								No section-only events on the calendar yet.
							</Text>
						)}
					</Box>

					<VStack
						align="stretch"
						gap={5}
						bg="linear-gradient(180deg, #f7fbff 0%, #f0f6ff 100%)"
						border="1px solid #dce8f6"
						borderRadius="24px"
						p={{ base: 3, md: 4 }}
					>
						<Box
							bg="rgba(255,255,255,0.92)"
							border="1px solid #dce8f6"
							borderRadius="22px"
							p={5}
							boxShadow="0 8px 24px rgba(43, 107, 176, 0.08)"
						>
							<SectionResidents
								buildingName={section.building}
								defaultSectionId={userSectionId}
								currentUserId={currentUserId}
							/>
						</Box>

						<Box w="full">
							<SectionEventCalendar
								sectionId={section.id}
								events={events}
								onCreate={(payload) =>
									create(section.id, payload)
								}
								onUpdate={update}
								onRemove={remove}
							/>
						</Box>
					</VStack>
				</VStack>
			) : null}
		</AppShell>
	)
}

export const Component = SectionPage
