import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import { Box, Heading, HStack, Text } from "@chakra-ui/react"

type Props = {
	resident: SectionUserDto
	isYou?: boolean
}

export default function ResidentCard({ resident, isYou }: Props) {
	return (
		<Box
			bg="white"
			border="1px solid #dce5df"
			borderRadius="22px"
			p={5}
			boxShadow={
				isYou
					? "0 0 0 2px #90d5ff, 0 12px 28px rgba(83, 130, 182, 0.12)"
					: "none"
			}
		>
			<HStack justify="space-between" align="flex-start" mb={2}>
				<Text fontSize="sm" color="#718176">
					Room {resident.roomNumber}
				</Text>
				{isYou ? (
					<Text
						fontSize="xs"
						fontWeight="semibold"
						color="#163447"
						bg="#d8ebff"
						borderRadius="full"
						px={2}
						py={0.5}
					>
						You
					</Text>
				) : null}
			</HStack>
			<Heading size="md" mb={2}>
				{`${resident.firstName} ${resident.lastName}`}
			</Heading>
			<Text color="#506057" fontSize="sm" mb={1}>
				{resident.email}
			</Text>
			<Text color="#506057">{resident.major}</Text>
			<Text color="#506057">
				{resident.stayPeriodEnd as unknown as string}
			</Text>
			<HStack mt={3} gap={2} flexWrap="wrap">
				{resident?.interests?.map((interest) => (
					<Text
						key={interest}
						fontSize="sm"
						bg="#edf7f1"
						color="#355243"
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
