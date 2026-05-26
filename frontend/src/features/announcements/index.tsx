import AnnouncementApi from "@/api/announcement"
import SectionUserApi from "@/api/sectionUser"
import AppShell from "@/components/AppShell"
import AnnouncementDto from "@/shared/types/announcement/announcement.dto"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import {
	Box,
	Button,
	Heading,
	HStack,
	Input,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react"
import { type FormEvent, useEffect, useState } from "react"

export default function AnnouncementsPage() {
	const [currentUser, setCurrentUser] = useState<SectionUserDto | null>(null)
	const [announcements, setAnnouncements] = useState<AnnouncementDto[]>([])
	const [title, setTitle] = useState("")
	const [meta, setMeta] = useState("")
	const [body, setBody] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	const [isCreating, setIsCreating] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [createMessage, setCreateMessage] = useState<string | null>(null)

	useEffect(() => {
		async function loadAnnouncements() {
			try {
				const user = await SectionUserApi.getSelfAuthenticated()
				const data = await AnnouncementApi.getByBuildingId(
					user.buildingId,
				)
				setCurrentUser(user)
				setAnnouncements(data)
			} catch {
				setError("Could not load announcements.")
			} finally {
				setIsLoading(false)
			}
		}

		void loadAnnouncements()
	}, [])
	const canCreateAnnouncement =
		currentUser?.buildingId &&
		["landlord", "section_admin", "admin"].includes(currentUser.role)

	async function handleCreateAnnouncement(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setCreateMessage(null)
		if (!currentUser?.buildingId) return
		setIsCreating(true)
		try {
			const createdAnnouncement = await AnnouncementApi.create({
				buildingId: currentUser.buildingId,
				title,
				meta,
				body,
			})
			setAnnouncements((current) => [createdAnnouncement, ...current])
			setTitle("")
			setMeta("")
			setBody("")
			setCreateMessage("Announcement added.")
		} catch {
			setCreateMessage("Could not add announcement.")
		} finally {
			setIsCreating(false)
		}
	}

	const announcementForm = canCreateAnnouncement ? (
		<Box bg="white" border="1px solid #dce5df" borderRadius="16px" p={5}>
			<form onSubmit={handleCreateAnnouncement}>
				<VStack align="stretch" gap={4}>
					<Heading size="md">Add announcement</Heading>
					<HStack gap={4} align="flex-start">
						<Input
							placeholder="Title"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							bg="white"
							required
						/>
						<Input
							placeholder="Meta"
							value={meta}
							onChange={(event) => setMeta(event.target.value)}
							bg="white"
							required
						/>
					</HStack>
					<textarea
						placeholder="Body"
						value={body}
						onChange={(event) => setBody(event.target.value)}
						required
						style={{
							background: "white",
							border: "1px solid #dce5df",
							borderRadius: "8px",
							minHeight: "120px",
							padding: "12px",
							resize: "vertical",
							width: "100%",
						}}
					/>
					<HStack justify="space-between">
						<Text
							color={
								createMessage?.startsWith("Could")
									? "#9b2c2c"
									: "#246b45"
							}
						>
							{createMessage}
						</Text>
						<Button
							type="submit"
							bg="#90d5ff"
							color="#163447"
							borderRadius="12px"
							loading={isCreating}
							_hover={{ bg: "#78c9fb" }}
						>
							Add announcement
						</Button>
					</HStack>
				</VStack>
			</form>
		</Box>
	) : null

	return (
		<AppShell
			title="Announcements"
			description="Stay up to date with new info!"
		>
			{isLoading ? (
				<Spinner />
			) : error ? (
				<Text color="#9b2c2c">{error}</Text>
			) : announcements.length === 0 ? (
				<VStack align="stretch" gap={4}>
					{announcementForm}
					<Text color="#506057">No announcements yet.</Text>
				</VStack>
			) : (
				<VStack align="stretch" gap={4}>
					{announcementForm}
					{announcements.map((announcement) => (
						<Box
							key={announcement.id}
							bg="white"
							border="1px solid #dce5df"
							borderRadius="22px"
							p={5}
						>
							<HStack
								justify="space-between"
								align="flex-start"
								mb={3}
								gap={4}
							>
								<Box>
									<Heading size="md">
										{announcement.title}
									</Heading>
									<Text mt={2} color="#6a7a71">
										{announcement.meta}
									</Text>
								</Box>
							</HStack>
							<Text color="#506057">{announcement.body}</Text>
						</Box>
					))}
				</VStack>
			)}
		</AppShell>
	)
}

export const Component = AnnouncementsPage
