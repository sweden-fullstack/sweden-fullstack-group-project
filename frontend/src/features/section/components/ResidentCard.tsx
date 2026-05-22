import type { ResidentProfile } from "@/api/section"
import { Box, Heading, HStack, Text } from "@chakra-ui/react"

type Props = {
	resident: ResidentProfile
	isYou?: boolean
}

export default function ResidentCard({ resident, isYou }: Props) {
	return (
		<Box
			bg="#f9fcff"
			border="1px solid #d5e3f3"
			borderRadius="12px"
			p={4}
			boxShadow={
				isYou
					? "0 0 0 2px #a9cff5, 0 8px 20px rgba(43, 107, 176, 0.12)"
					: "none"
			}
		>
			<HStack justify="space-between" align="flex-start" mb={2}>
				<Text fontSize="sm" color="#4b6177">
					Room {resident.roomNumber}
				</Text>
				{isYou ? (
					<Text
						fontSize="xs"
						fontWeight="semibold"
						color="#123a5f"
						bg="#d8ebff"
						borderRadius="full"
						px={2}
						py={0.5}
					>
						You
					</Text>
				) : null}
			</HStack>
			<Heading size="sm" mb={2} color="#274d72">
				{resident.fullName}
			</Heading>
			<Text color="#355270" fontSize="sm" mb={1}>
				{resident.email}
			</Text>
			<Text color="#355270">{resident.major}</Text>
			<Text color="#355270">{resident.stayPeriod}</Text>
			<HStack mt={3} gap={2} flexWrap="wrap">
				{resident.interests.map((interest) => (
					<Text
						key={interest}
						fontSize="sm"
						bg="#e8f3ff"
						color="#274d72"
						borderRadius="999px"
						px={3}
						py={1}
					>
						{interest}
					</Text>
				))}
			</HStack>
		</Box>
	)
}
