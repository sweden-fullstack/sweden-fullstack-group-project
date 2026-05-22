import SectionApi, {
	type ResidentProfile,
	type SectionSummary,
} from "@/api/section"
import ResidentCard from "@/features/section/components/ResidentCard"
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
	defaultSectionId: number
	currentUserId: number | null
}

export default function SectionResidents({
	buildingName,
	defaultSectionId,
	currentUserId,
}: Props) {
	const [sections, setSections] = useState<SectionSummary[]>([])
	const [residents, setResidents] = useState<ResidentProfile[]>([])
	const [selectedSectionId, setSelectedSectionId] = useState(defaultSectionId)
	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		void (async () => {
			const [sectionList, allResidents] = await Promise.all([
				SectionApi.getSectionsInBuilding(buildingName),
				SectionApi.getBuildingResidents(buildingName),
			])
			setSections(sectionList)
			setResidents(allResidents)
		})()
	}, [buildingName])

	const isSearching = nameQuery.trim().length > 0

	const displayedResidents = useMemo(() => {
		const query = nameQuery.trim().toLowerCase()
		if (query) {
			return residents.filter((r) =>
				r.fullName.toLowerCase().includes(query),
			)
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
							key={resident.id}
							resident={resident}
							isYou={currentUserId === resident.id}
						/>
					))}
				</Grid>
			)}
		</Box>
	)
}
