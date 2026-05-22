import { Button } from "@chakra-ui/react"

type Props = {
	active: boolean
	onClick: () => void
	label: string
}

export default function CalendarFilterButton({
	active,
	onClick,
	label,
}: Props) {
	return (
		<Button
			size="sm"
			bg={active ? "#d8ebff" : "white"}
			color="#123a5f"
			border="1px solid"
			borderColor={active ? "#a9cff5" : "#d2deea"}
			fontWeight="normal"
			_hover={{
				bg: active ? "#d8ebff" : "white",
				borderColor: active ? "#a9cff5" : "#d2deea",
			}}
			_active={{
				bg: active ? "#d8ebff" : "white",
				borderColor: active ? "#a9cff5" : "#d2deea",
			}}
			onClick={onClick}
		>
			{label}
		</Button>
	)
}
