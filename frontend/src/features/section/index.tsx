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

					<SectionResidents
						buildingName={section.building}
						defaultSectionId={userSectionId}
						currentUserId={currentUserId}
					/>

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
						<SectionEventCalendar
							sectionId={section.id}
							events={events}
							onCreate={(payload) => create(section.id, payload)}
							onUpdate={update}
							onRemove={remove}
						/>
					</Box>
				</VStack>
			) : null}
		</AppShell>
	)
}

export const Component = SectionPage
