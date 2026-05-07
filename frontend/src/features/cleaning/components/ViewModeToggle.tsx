import { Button, Flex } from "@chakra-ui/react"
import type { ViewMode } from "../types"

type Props = {
	viewMode: ViewMode
	onChange: (mode: ViewMode) => void
}

export default function ViewModeToggle({ viewMode, onChange }: Props) {
	return (
		<Flex gap={3} flexWrap="wrap">
			<Button
				bg={viewMode === "section" ? "#d8ebff" : "white"}
				color="#123a5f"
				border="1px solid"
				borderColor={viewMode === "section" ? "#a9cff5" : "#d2deea"}
				_hover={{ bg: viewMode === "section" ? "#d8ebff" : "#f4f9ff" }}
				onClick={() => onChange("section")}
			>
				View whole section
			</Button>
			<Button
				bg={viewMode === "mine" ? "#d8ebff" : "white"}
				color="#123a5f"
				border="1px solid"
				borderColor={viewMode === "mine" ? "#a9cff5" : "#d2deea"}
				_hover={{ bg: viewMode === "mine" ? "#d8ebff" : "#f4f9ff" }}
				onClick={() => onChange("mine")}
			>
				View my duties only
			</Button>
		</Flex>
	)
}
