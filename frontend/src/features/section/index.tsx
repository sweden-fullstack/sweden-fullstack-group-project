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
import { useEffect, useState } from "react"

export default function SectionPage() {
	const [section, setSection] = useState<SectionDetails | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

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

	return (
		<AppShell
			title="Section"
			description="See who lives in your section, room information, shared interests, and upcoming section events."
		>
			{isLoading ? (
				<Spinner />
			) : error ? (
				<Text color="#9b2c2c">{error}</Text>
			) : section ? (
				<VStack align="stretch" gap={6}>
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
							{section.building} - {section.description}
						</Text>
					</Box>

					<Grid
						templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
						gap={4}
					>
						{section.residents.map((resident) => (
							<Box
								key={resident.id}
								bg="white"
								border="1px solid #dce5df"
								borderRadius="22px"
								p={5}
							>
								<Text fontSize="sm" color="#718176" mb={2}>
									Room {resident.roomNumber}
								</Text>
								<Heading size="md" mb={2}>
									{resident.fullName}
								</Heading>
								<Text color="#506057">{resident.major}</Text>
								<Text color="#506057">
									{resident.stayPeriod}
								</Text>
								<HStack mt={3} gap={2} flexWrap="wrap">
									{resident.interests.map((interest) => (
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
									))}
								</HStack>
							</Box>
						))}
					</Grid>

					<VStack align="stretch" gap={4}>
						<Heading size="md">Section events</Heading>
						{section.events.map((event) => (
							<Box
								key={event.id}
								bg="white"
								border="1px solid #dce5df"
								borderRadius="22px"
								p={5}
							>
								<Heading size="sm" mb={2}>
									{event.title}
								</Heading>
								<Text color="#718176">
									{event.startTime} - {event.location}
								</Text>
								<Text mt={2} color="#506057">
									{event.description}
								</Text>
							</Box>
						))}
					</VStack>
				</VStack>
			) : null}
		</AppShell>
	)
}

export const Component = SectionPage
