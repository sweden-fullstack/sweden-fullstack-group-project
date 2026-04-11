import { ButtonOutlinedOnHover } from "@/components/ButtonOutlinedOnHover"
import { Center, VStack, Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Panda } from "lucide-react"

export default function NotFoundPage() {
	const navigate = useNavigate()

	return (
		<Box minW="100vw" minH="100vh">
			<Center paddingTop={50}>
				<VStack>
					<Panda size={125} />
					<h1>Page not found</h1>
					<ButtonOutlinedOnHover onClick={() => navigate(-1)}>
						<p>Go back</p>
					</ButtonOutlinedOnHover>
				</VStack>
			</Center>
		</Box>
	)
}

// Necessary for lazy load
export const Component = NotFoundPage
