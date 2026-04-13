import { useEffect, useState } from "react"
import heroImg from "@/assets/hero.png"
import useCounterStore from "./stores/counter"
import { ButtonOutlinedOnHover } from "@/components/ButtonOutlinedOnHover"
import { Box, Button, Center, Code, Separator, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import ReactIcon from "./components/ReactIcon"
import { ViteIcon } from "./components/ViteIcon"
import useUserStore from "./stores/userStore"

export default function WelcomePage() {
	const [count, setCount] = useState(0)
	const { count: zustandCount, increment } = useCounterStore()
	const navigate = useNavigate()
	const { users, getUsers } = useUserStore()

	useEffect(() => {
		getUsers()
	}, [getUsers])

	return (
		<Box minH="100vh" minW="100vw" bg="#16171d">
			<Center>
				<VStack>
					<div>
						<img src={heroImg} width="170" height="179" alt="" />
						<ReactIcon />
						<ViteIcon />
					</div>
					<h1
						style={{
							fontSize: "56px",
							letterSpacing: "-1.68px",
							margin: "32px 0",
						}}
					>
						Get started
					</h1>
					<p>
						Edit{" "}
						<Code padding={2} fontSize={20}>
							src/App.tsx
						</Code>{" "}
						and save to test{" "}
						<Code padding={2} fontSize={20}>
							HMR
						</Code>
					</p>
					<Separator
						marginTop={1}
						paddingBottom={3}
						size="lg"
						variant="solid"
						minW="100vw"
					/>
					<ButtonOutlinedOnHover
						onClick={() => setCount((count) => count + 1)}
					>
						Count is {count}
					</ButtonOutlinedOnHover>

					<ButtonOutlinedOnHover onClick={() => increment()}>
						Zustand count is {zustandCount}
					</ButtonOutlinedOnHover>
					<Button
						variant="outline"
						color="white"
						onClick={() => navigate("/not-found")}
					>
						Test Zustand (press go back)
					</Button>
					<b>All the users we know, there are not many</b>
					{users.map((user) => (
						<p key={user.username}>
							{user.username} - {user.gmail}
						</p>
					))}
				</VStack>
			</Center>
		</Box>
	)
}

// Necessary for lazy load
export const Component = WelcomePage
