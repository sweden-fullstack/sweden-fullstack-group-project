import {
	Box,
	Flex,
	VStack,
	Input,
	Button,
	Heading,
	Text,
} from "@chakra-ui/react"
import { useState } from "react"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import UserApi from "@/api/user"

type UserUpdate = {
	firstName: string
	lastName: string
	major: string
	profilePictureUrl?: string
}

interface EditProfileModalProps {
	userId: number
	isOpen: boolean
	onClose: () => void
	userData: SectionUserDto
	onSaveSuccess: () => void
}

export default function EditProfileModal({
	userId,
	isOpen,
	onClose,
	userData,
	onSaveSuccess,
}: EditProfileModalProps) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [formData, setFormData] = useState<UserUpdate>({
		firstName: userData.firstName || "",
		lastName: userData.lastName || "",
		major: userData.major || "",
		profilePictureUrl: userData.profilePictureUrl || "",
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		try {
			await UserApi.update(userId, formData)
			alert("Profile updated successfully!")
			onSaveSuccess()
			onClose()
		} catch (err) {
			console.error("Failed to update user:", err)
			alert("An error occurred. Unable to update profile.")
		} finally {
			setIsSubmitting(false)
		}
	}

	if (!isOpen) return null

	return (
		<Flex
			position="fixed"
			inset={0}
			bg="rgba(0, 0, 0, 0.5)"
			zIndex={1000}
			align="center"
			justify="center"
			onClick={onClose}
			p={4}
		>
			<Box
				bg="white"
				p={6}
				borderRadius="xl"
				w="100%"
				maxW="md"
				boxShadow="lg"
				onClick={(e) => e.stopPropagation()}
			>
				<Heading size="md" mb={6} color="#274d72">
					Edit Profile
				</Heading>

				<form onSubmit={handleSubmit}>
					<VStack gap={4} align="stretch">
						<Box>
							<Text mb={1} fontSize="sm" fontWeight="500">
								First Name *
							</Text>
							<Input
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								required
							/>
						</Box>

						<Box>
							<Text mb={1} fontSize="sm" fontWeight="500">
								Last Name *
							</Text>
							<Input
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								required
							/>
						</Box>

						<Box>
							<Text mb={1} fontSize="sm" fontWeight="500">
								Major *
							</Text>
							<Input
								name="major"
								value={formData.major}
								onChange={handleChange}
								required
							/>
						</Box>

						<Box>
							<Text mb={1} fontSize="sm" fontWeight="500">
								Profile Picture URL
							</Text>
							<Input
								name="profilePictureUrl"
								value={formData.profilePictureUrl}
								onChange={handleChange}
								placeholder="https://..."
							/>
						</Box>
					</VStack>

					<Flex justify="flex-end" mt={8} gap={3}>
						<Button
							variant="ghost"
							borderRadius="16px"
							onClick={onClose}
							disabled={isSubmitting}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							bg="#90d5ff"
							color="#163447"
							borderRadius="16px"
							_hover={{ bg: "#78c9fb" }}
							disabled={isSubmitting}
						>
							{isSubmitting ? "Saving..." : "Save Changes"}
						</Button>
					</Flex>
				</form>
			</Box>
		</Flex>
	)
}
