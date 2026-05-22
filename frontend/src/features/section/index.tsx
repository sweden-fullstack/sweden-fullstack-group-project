import AppShell from "@/components/AppShell"
import SectionEventCalendar from "@/features/section/components/SectionEventCalendar"
import SectionResidents from "@/features/section/components/SectionResidents"
import { formatTimeRange } from "@/features/section/utils/formatTimes"
import { pickNearestSectionOnlyEvent } from "@/features/section/utils/pickNearestSectionOnlyEvent"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import SectionUserApi from "@/api/sectionUser"
import SectionApi from "@/api/section"
import SectionDto from "@/shared/types/section/section.dto"

export default function SectionPage() {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [currentUser, setCurrentUser] = useState<SectionUserDto | null>(null)
	const [section, setSection] = useState<SectionDto | null>(null)

	useEffect(() => {
		void (async () => {
			try {
				const self = await SectionUserApi.getSelfAuthenticated()
				setCurrentUser(self)

				const section = await SectionApi.getById()
				setSection(section)
			} catch {
				setError("Could not load user info")
			} finally {
				setIsLoading(false)
			}
		})()
	}, [])

	const spotlight = useMemo(
		() => pickNearestSectionOnlyEvent(section.events),
		[section.events],
	)

	const spotlightIsPast = spotlight
		? new Date(spotlight.endTime) < new Date()
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
							{section.buildingName} · {section.description}
						</Text>
					</Box>

					<SectionResidents
						buildingName={section.buildingName}
						defaultSectionId={currentUser.sectionId}
						currentUserId={currentUser.userId}
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
							section={section}
							currentUser={currentUser}
						/>
					</Box>
				</VStack>
			) : null}
		</AppShell>
	)
}

export const Component = SectionPage
