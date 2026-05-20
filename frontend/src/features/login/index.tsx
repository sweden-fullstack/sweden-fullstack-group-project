import AuthApi from "@/api/auth"
import SectionUserApi from "@/api/sectionUser"
import envConfig from "@/config/env"
import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react"
import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setError(null)
		setIsSubmitting(true)

		try {
			const user = await AuthApi.login({ email, password })
			localStorage.setItem("jmsUser", JSON.stringify(user))
			navigate("/")
		} catch {
			setError("Could not log in with those details.")
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleGoogleSignIn = () => {
		window.location.href = `${envConfig.backend}auth`
	}

	const getSelfAuthenticated = () => {
		try {
			SectionUserApi.getSelfAuthenticated().then((user) => {
				console.log(user)
			})
		} catch {
			console.log("Sign in first")
		}
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
				<Box
					asChild
					bg="rgba(255,255,255,0.82)"
					border="1px solid rgba(30, 42, 36, 0.08)"
					borderRadius="24px"
					p={7}
					boxShadow="0 18px 50px rgba(54, 74, 62, 0.08)"
				>
					<form onSubmit={handleSubmit}>
						<VStack align="stretch" gap={5}>
							<Box>
								<Text fontSize="sm" color="#718176" mb={2}>
									Student housing access
								</Text>
								<Heading size="lg">Log in</Heading>
							</Box>

							<Box>
								<label htmlFor="email">Email</label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(event) =>
										setEmail(event.target.value)
									}
									bg="white"
									required
								/>
							</Box>

							<Box>
								<label htmlFor="password">Password</label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(event) =>
										setPassword(event.target.value)
									}
									bg="white"
									required
								/>
							</Box>

							{error ? (
								<Text color="#9b2c2c">{error}</Text>
							) : null}

							<Button
								type="submit"
								bg="#90d5ff"
								color="#163447"
								borderRadius="16px"
								loading={isSubmitting}
								_hover={{ bg: "#78c9fb" }}
							>
								Log in
							</Button>
							<Button
								onClick={handleGoogleSignIn}
								borderRadius="16px"
								bg="#90d5ff"
							>
								Google Sign-In
							</Button>
							<Button
								onClick={getSelfAuthenticated}
								borderRadius="16px"
								bg="#90d5ff"
							>
								Check authenticated
							</Button>
						</VStack>
					</form>
				</Box>
			</Box>
		</Box>
	)
}

export const Component = LoginPage
