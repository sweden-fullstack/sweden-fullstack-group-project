import envConfig from "@/config/env"
import AuthApi from "@/api/auth"
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
	const navigate = useNavigate()
	const handleGoogleSignIn = () => {
		window.location.href = `${envConfig.backend}auth`
	}

	const handleGoBack = () => {
		navigate(-1)
	}

	return (
		<Box
			minH="100vh"
			bg="linear-gradient(180deg, #f4efe6 0%, #f8f9f5 45%, #edf3ef 100%)"
			color="#1e2a24"
			display="grid"
			placeItems="center"
			px={5}
		>
			<Box w="full" maxW="420px">
				<Box mb={4}>
					<Button
						onClick={handleGoBack}
						variant="ghost"
						color="#718176"
						_hover={{
							color: "#1e2a24",
							bg: "rgba(30, 42, 36, 0.08)",
						}}
						borderRadius="12px"
						size="sm"
					>
						← Back
					</Button>
				</Box>
				<Box
					bg="rgba(255,255,255,0.82)"
					border="1px solid rgba(30, 42, 36, 0.08)"
					borderRadius="24px"
					p={7}
					boxShadow="0 18px 50px rgba(54, 74, 62, 0.08)"
				>
					<VStack align="stretch" gap={5}>
						<Flex justify="space-between" align="center" mb={2}>
							<Text fontSize="sm" color="#718176">
								Student housing access
							</Text>
							<Button
								variant="ghost"
								size="sm"
								color="#718176"
								fontWeight="normal"
								_hover={{ bg: "gray.100" }}
								onClick={() => {
									AuthApi.logout().then(() => {
										navigate("/")
									})
								}}
							>
								Sign out
							</Button>
						</Flex>

						<Button
							onClick={handleGoogleSignIn}
							borderRadius="16px"
							bg="#90d5ff"
							color="#163447"
							_hover={{ bg: "#78c9fb" }}
						>
							Google Sign-In
						</Button>
					</VStack>
				</Box>
			</Box>
		</Box>
	)
}

export const Component = LoginPage
