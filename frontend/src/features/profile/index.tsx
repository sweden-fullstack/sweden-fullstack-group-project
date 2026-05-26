import AppShell from "@/components/AppShell"
import {
	Box,
	Center,
	Grid,
	Heading,
	Spinner,
	Text,
	Button,
	Flex,
	HStack,
	VStack,
	useDisclosure,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import SectionUserApi from "@/api/sectionUser"
import EditProfileModal from "./components/EditProfileModal"
import { User, MapPin, Calendar, BookOpen, Mail } from "lucide-react"

export default function ProfilePage() {
	const [userData, setUserData] = useState<SectionUserDto>()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const [refreshKey, setRefreshKey] = useState(0)

	const { open: isOpen, onOpen, onClose } = useDisclosure()

	useEffect(() => {
		const fetchUserData = async () => {
			setIsLoading(true)
			try {
				const data = await SectionUserApi.getSelfAuthenticated()
				setUserData(data)
				setError(null)
			} catch {
				setError("Could not load your data.")
			} finally {
				setIsLoading(false)
			}
		}

		void fetchUserData()
	}, [refreshKey])

	const handleSaveSuccess = () => {
		setRefreshKey((prev) => prev + 1)
	}

	if (isLoading && !userData) {
		return (
			<AppShell
				title="Resident profile"
				description="Loading your profile..."
			>
				<Center mt={10}>
					<Spinner size="xl" color="#274d72" />
				</Center>
			</AppShell>
		)
	}

	if (error || !userData) {
		return (
			<AppShell
				title="Resident profile"
				description="Use this page for room information, contact details, and account-level settings related to student housing."
			>
				<Text color="#9b2c2c">{error || "User data not found"}</Text>
			</AppShell>
		)
	}

	const profileCards = [
		{
			title: "Resident",
			icon: <User size={20} color="#274d72" />,
			details: [
				{
					label: "Name",
					value: `${userData.firstName} ${userData.lastName}`,
				},
				{ label: "User ID", value: userData.userId },
			],
		},
		{
			title: "Room",
			icon: <MapPin size={20} color="#274d72" />,
			details: [
				{ label: "Building", value: userData.buildingId },
				{ label: "Section", value: userData.sectionId },
				{ label: "Room", value: userData.roomNumber },
			],
		},
		{
			title: "Stay Period",
			icon: <Calendar size={20} color="#274d72" />,
			details: [
				{ label: "Arrival", value: userData.stayPeriodStart },
				{ label: "Departure", value: userData.stayPeriodEnd },
			],
		},
		{
			title: "Personal",
			icon: <BookOpen size={20} color="#274d72" />,
			details: [{ label: "Major", value: userData.major }],
		},
		{
			title: "Contact",
			icon: <Mail size={20} color="#274d72" />,
			details: [{ label: "Email", value: userData.email }],
		},
	]

	return (
		<AppShell
			title="Resident profile"
			description="Use this page for room information, contact details, and account-level settings related to student housing."
		>
			<Flex
				direction={{ base: "column", md: "row" }}
				justify="flex-end"
				align={{ base: "flex-start", md: "center" }}
				mb={8}
				gap={4}
			>
				<HStack gap={3}>
					<Button
						bg="#90d5ff"
						color="#163447"
						borderRadius="16px"
						_hover={{ bg: "#78c9fb" }}
						px={6}
						onClick={onOpen}
					>
						Edit Profile
					</Button>
				</HStack>
			</Flex>

			<Grid
				templateColumns={{
					base: "1fr",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				}}
				gap={6}
			>
				{profileCards.map((section) => (
					<Box
						key={section.title}
						bg="white"
						border="1px solid #e2e8f0"
						borderRadius="2xl"
						p={6}
						boxShadow="sm"
						transition="all 0.2s"
						_hover={{ boxShadow: "md" }}
					>
						<HStack gap={3} mb={4}>
							<Flex
								bg="#f0f5f9"
								p={2}
								borderRadius="md"
								align="center"
								justify="center"
							>
								{section.icon}
							</Flex>
							<Heading size="sm" fontWeight="600" color="#2d3748">
								{section.title}
							</Heading>
						</HStack>

						<VStack align="stretch" gap={3}>
							{section.details.map((detail, idx) => (
								<Flex
									key={idx}
									justify="space-between"
									align="flex-start"
									gap={4}
								>
									<Text
										fontSize="sm"
										color="#718176"
										fontWeight="500"
									>
										{detail.label}
									</Text>
									<Text
										fontSize="sm"
										fontWeight="600"
										color="#1a202c"
									>
										{detail.value || "—"}
									</Text>
								</Flex>
							))}
						</VStack>
					</Box>
				))}
			</Grid>

			{isOpen && (
				<EditProfileModal
					userId={userData.userId}
					isOpen={isOpen}
					onClose={onClose}
					userData={userData}
					onSaveSuccess={handleSaveSuccess}
				/>
			)}
		</AppShell>
	)
}

export const Component = ProfilePage
