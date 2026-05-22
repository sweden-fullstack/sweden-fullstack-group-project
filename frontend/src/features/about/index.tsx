import AppShell from "@/components/AppShell"
import {
	Box,
	Container,
	Heading,
	Image,
	SimpleGrid,
	Text,
	VStack,
} from "@chakra-ui/react"

// just put you picture into the public/teamMemberPic folder and put the path into image
const teamMembers = [
	{
		name: "Bi Chen",
		focus: "Frontend Developer & UI/UX",
		image: "https://via.placeholder.com/150",
	},
	{
		name: "Ellen",
		focus: "Backend Developer & Database",
		image: "https://via.placeholder.com/150",
	},
	{
		name: "Taylor Lindberg",
		focus: "Fullstack Developer & API Design",
		image: "https://via.placeholder.com/150",
	},
	{
		name: "David Baden",
		focus: "Backend routes and About page",
		image: "/teamMemberPic/davidpic.jpeg",
	},
]

export default function AboutPage() {
	return (
		<AppShell
			title="About"
			description="This page shows the information about the developer of zona and the mission behind our application zona"
		>
			<Container maxW="container.xl" py={10}>
				<VStack gap={8} textAlign="center" mb={12}>
					<Heading as="h1" size="2xl">
						Team Erasmus and adopted
					</Heading>
					<Text fontSize="lg" color="gray.600" maxW="2xl">
						We are a group of passionate developers who want to
						create a central student hub for your dorm! Meet the
						minds behind the code and check out what each of us
						focuses on!
					</Text>
				</VStack>

				<SimpleGrid minChildWidth="250px" gap={8} autoColumns="fr">
					{teamMembers.map((member) => (
						<Box
							key={member.name}
							borderRadius="lg"
							overflow="hidden"
							boxShadow="md"
							bg="white"
						>
							<Image
								src={member.image}
								alt={`Profile picture of ${member.name}`}
								objectFit="cover"
								height="250px"
								width="100%"
							/>
							<VStack gap={3} p={4} textAlign="center">
								<Heading as="h3" size="md">
									{member.name}
								</Heading>
								<Text color="blue.500" fontWeight="medium">
									{member.focus}
								</Text>
							</VStack>
						</Box>
					))}
				</SimpleGrid>
			</Container>
		</AppShell>
	)
}

export const Component = AboutPage
