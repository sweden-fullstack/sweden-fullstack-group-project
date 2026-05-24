import AnnouncementApi from "@/api/announcement"
import AppShell from "@/components/AppShell"
import AnnouncementDto from "@/shared/types/announcement/announcement.dto"
import { Box, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function AnnouncementsPage() {
	const [announcements, setAnnouncements] = useState<AnnouncementDto[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function loadAnnouncements() {
			try {
				const data = await AnnouncementApi.getByBuildingId()
				setAnnouncements(data)
			} catch {
				setError("Could not load announcements.")
			} finally {
				setIsLoading(false)
			}
		}

		void loadAnnouncements()
	}, [])

	return (
		<AppShell
			title="Announcements"
			description="Stay up to date with new info!"
		>
			{isLoading ? (
				<Spinner />
			) : error ? (
				<Text color="#9b2c2c">{error}</Text>
			) : announcements.length === 0 ? (
				<Text color="#506057">No announcements yet.</Text>
			) : (
				<VStack align="stretch" gap={4}>
					{announcements.map((announcement) => (
						<Box
							key={announcement.id}
							bg="white"
							border="1px solid #dce5df"
							borderRadius="22px"
							p={5}
						>
							<HStack
								justify="space-between"
								align="flex-start"
								mb={3}
								gap={4}
							>
								<Box>
									<Heading size="md">
										{announcement.title}
									</Heading>
									<Text mt={2} color="#6a7a71">
										{announcement.meta}
									</Text>
								</Box>
							</HStack>
							<Text color="#506057">{announcement.body}</Text>
						</Box>
					))}
				</VStack>
			)}
		</AppShell>
	)
}

export const Component = AnnouncementsPage
