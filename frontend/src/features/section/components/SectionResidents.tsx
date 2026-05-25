import SectionApi from "@/api/section"
import SectionUserApi from "@/api/sectionUser"
import ResidentCard from "@/features/section/components/ResidentCard"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import SectionDto from "@/shared/types/section/section.dto"
import { Box, Grid, Heading, Input, Text, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"

const fieldStyle = {
	width: "100%",
	borderRadius: "12px",
	border: "1px solid #cad6cf",
	padding: "8px 12px",
	fontSize: "1rem",
	background: "white",
} as const

type Props = {
	buildingName: string
	currentUser: SectionUserDto
}

export default function SectionResidents({ buildingName, currentUser }: Props) {
	const [sections, setSections] = useState<SectionDto[]>([])
	const [residents, setResidents] = useState<SectionUserDto[]>([])
	const [selectedSectionId, setSelectedSectionId] = useState(
		currentUser.sectionId,
	)
	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		void (async () => {
			const [sectionList, allResidents] = await Promise.all([
				SectionApi.getAllByBuildingId(),
				SectionUserApi.getUsersByBuilding(),
			])
			setSections(sectionList)
			setResidents(allResidents)
		})()
	}, [buildingName])

	const isSearching = nameQuery.trim().length > 0

	const displayedResidents = useMemo(() => {
		const query = nameQuery.trim().toLowerCase()
		if (query) {
			return residents.filter((r) => {
				const fullName = `${r.firstName} ${r.lastName}`
				return fullName.toLowerCase().includes(query)
			})
		}
		return residents.filter((r) => r.sectionId === selectedSectionId)
	}, [residents, nameQuery, selectedSectionId])

	const selectedSection = sections.find((s) => s.id === selectedSectionId)

	return (
		<Box>
			<Heading size="md" mb={4}>
				Student residents
			</Heading>

			<VStack align="stretch" gap={3} mb={4}>
				<Box>
					<Text fontSize="sm" color="#718176" mb={1}>
						Section
					</Text>
					<select
						value={selectedSectionId}
						disabled={isSearching}
						onChange={(e) =>
							setSelectedSectionId(Number(e.target.value))
						}
						style={fieldStyle}
					>
						{sections.map((section) => (
							<option key={section.id} value={section.id}>
								{section.name}
							</option>
						))}
					</select>
				</Box>

				<Box>
					<Text fontSize="sm" color="#718176" mb={1}>
						Search by name ({buildingName})
					</Text>
					<Input
						placeholder="Search all residents in this building…"
						value={nameQuery}
						onChange={(e) => setNameQuery(e.target.value)}
						borderRadius="12px"
						border="1px solid #cad6cf"
						bg="white"
					/>
				</Box>
			</VStack>

			<Text fontSize="sm" color="#718176" mb={3}>
				{isSearching
					? `${displayedResidents.length} match${displayedResidents.length === 1 ? "" : "es"} in ${buildingName}`
					: selectedSection
						? `Residents in ${selectedSection.name}`
						: "Residents"}
			</Text>

			{displayedResidents.length === 0 ? (
				<Text color="#718176">No residents found.</Text>
			) : (
				<Grid
					templateColumns={{
						base: "1fr",
						md: "repeat(2, 1fr)",
					}}
					gap={4}
				>
					{displayedResidents.map((resident) => (
						<ResidentCard
							key={resident.userId}
							resident={resident}
							isYou={currentUser.userId === resident.userId}
						/>
					))}
				</Grid>
			)}
		</Box>
	)
}
