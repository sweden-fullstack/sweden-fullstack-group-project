import { Button, type ButtonProps } from "@chakra-ui/react"

/**
 * Example of chakra ui component extension
 */
export function ButtonOutlinedOnHover(props: ButtonProps) {
	return (
		<Button
			bg="rgba(192, 132, 252, 0.15)"
			variant="outline"
			borderColor="transparent"
			borderWidth="2px"
			color="#c084fc"
			_hover={{
				borderColor: "rgba(192, 132, 252, 0.5)",
			}}
			{...props}
		/>
	)
}
