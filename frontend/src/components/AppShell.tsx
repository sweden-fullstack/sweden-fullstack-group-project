import {
	Box,
	Button,
	Flex,
	HStack,
	Heading,
	Text,
	VStack,
} from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { type ReactNode } from "react"

type NavItem = {
	label: string
	path: string
}

type AppShellProps = {
	title: string
	description: string
	children: ReactNode
}

const navItems: NavItem[] = [
	{ label: "Dashboard", path: "/" },
	{ label: "Announcements", path: "/announcements" },
	{ label: "Cleaning", path: "/cleaning" },
	{ label: "House Rules", path: "/rules" },
	{ label: "Section", path: "/section" },
	{ label: "Profile", path: "/profile" },
	{ label: "About", path: "/about" },
]

export default function AppShell({
	title,
	description,
	children,
}: AppShellProps) {
	const navigate = useNavigate()
	const location = useLocation()

	return (
		<Box
			minH="100vh"
			bg="linear-gradient(180deg, #f4efe6 0%, #f8f9f5 45%, #edf3ef 100%)"
			color="#1e2a24"
		>
			<Box
				maxW="1200px"
				mx="auto"
				px={{ base: 5, md: 8 }}
				py={{ base: 5, md: 8 }}
			>
				<Flex
					direction={{ base: "column", lg: "row" }}
					gap={{ base: 6, lg: 10 }}
					align={{ base: "stretch", lg: "flex-start" }}
				>
					<Box
						w={{ base: "full", lg: "280px" }}
						bg="rgba(255,255,255,0.72)"
						backdropFilter="blur(10px)"
						border="1px solid rgba(30, 42, 36, 0.08)"
						borderRadius="24px"
						p={6}
						boxShadow="0 18px 50px rgba(54, 74, 62, 0.08)"
					>
						<VStack align="stretch" gap={6}>
							<Box>
								<Text
									fontSize="xs"
									textTransform="uppercase"
									letterSpacing="0.2em"
									color="#5d6d63"
									mb={2}
								>
									Student Housing
								</Text>
								<Heading size="lg" fontWeight="semibold">
									Zona
								</Heading>
								<Text mt={2} color="#4f5d55">
									Shared housing tools for chores, rules,
									residents, and updates.
								</Text>
							</Box>

							<VStack align="stretch" gap={3}>
								{navItems.map((item) => {
									const isActive =
										location.pathname === item.path

									return (
										<Button
											key={item.path}
											justifyContent="flex-start"
											onClick={() => navigate(item.path)}
											aria-current={
												isActive ? "page" : undefined
											}
											bg={
												isActive
													? "#90d5ff"
													: "transparent"
											}
											color="#163447"
											borderWidth="1px"
											borderColor={
												isActive ? "#90d5ff" : "#cad6cf"
											}
											_hover={{
												bg: isActive
													? "#90d5ff"
													: "#e6f5ff",
											}}
											borderRadius="16px"
										>
											{item.label}
										</Button>
									)
								})}
							</VStack>

							<Button
								justifyContent="flex-start"
								onClick={() => navigate("/login")}
								bg="transparent"
								color="#163447"
								borderWidth="1px"
								borderColor="#cad6cf"
								_hover={{ bg: "#e6f5ff" }}
								borderRadius="16px"
							>
								Log in
							</Button>
						</VStack>
					</Box>

					<Box flex="1">
						<Box
							bg="rgba(255,255,255,0.78)"
							border="1px solid rgba(30, 42, 36, 0.08)"
							borderRadius="28px"
							p={{ base: 6, md: 8 }}
							boxShadow="0 18px 50px rgba(54, 74, 62, 0.08)"
						>
							<VStack align="stretch" gap={8}>
								<Flex
									direction={{ base: "column", md: "row" }}
									align={{
										base: "flex-start",
										md: "flex-end",
									}}
									justify="space-between"
									gap={4}
								>
									<Box>
										<Text
											fontSize="xs"
											textTransform="uppercase"
											letterSpacing="0.2em"
											color="#718176"
											mb={2}
										>
											Housing Overview
										</Text>
										<Heading size="2xl" lineHeight="1.05">
											{title}
										</Heading>
										<Text
											mt={3}
											maxW="700px"
											color="#506057"
											fontSize="lg"
										>
											{description}
										</Text>
									</Box>

									<HStack
										gap={3}
										alignSelf={{
											base: "stretch",
											md: "auto",
										}}
									>
										<Button
											bg="#90d5ff"
											color="#163447"
											borderRadius="16px"
											_hover={{ bg: "#78c9fb" }}
											onClick={() =>
												navigate("/announcements")
											}
										>
											View updates
										</Button>
									</HStack>
								</Flex>

								{children}
							</VStack>
						</Box>
					</Box>
				</Flex>
			</Box>
		</Box>
	)
}
