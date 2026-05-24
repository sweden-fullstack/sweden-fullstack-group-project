import SectionApi from "@/api/section"
import SectionUserApi from "@/api/sectionUser"
import UserApi from "@/api/user"
import AppShell from "@/components/AppShell"
import type SectionDto from "@/shared/types/section/section.dto"
import type SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import type UserRole from "@/shared/types/user-role/userRole"
import type UserDto from "@/shared/types/user/user.dto"
import {
	Badge,
	Box,
	Button,
	Grid,
	Heading,
	HStack,
	Input,
	Spinner,
	Table,
	Text,
	VStack,
} from "@chakra-ui/react"
import {
	type ChangeEvent,
	type CSSProperties,
	type FormEvent,
	type ReactNode,
	useEffect,
	useMemo,
	useState,
} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

type Resident = {
	userId: number
	email?: string
	firstName?: string
	lastName?: string
	roomNumber?: number
	major?: string
	role?: UserRole
	sectionId?: number
	buildingId?: number
	stayPeriodStart?: Date | string
	stayPeriodEnd?: Date | string
}

const managedRoles: UserRole[] = ["student", "section_admin"]
const privilegedRoles: UserRole[] = ["landlord", "admin"]
const defaultAddUserForm = {
	email: "",
	firstName: "",
	lastName: "",
	roomNumber: "",
	major: "",
	stayPeriodStart: "",
	stayPeriodEnd: "",
	role: "student" as UserRole,
	sectionId: "",
}
const inputBorderColor = "rgba(118, 139, 127, 0.22)"
const selectStyle: CSSProperties = {
	background: "white",
	border: `1px solid ${inputBorderColor}`,
	borderRadius: "8px",
	height: "40px",
	paddingInline: "12px",
}

export default function AdminDashboardPage() {
	const navigate = useNavigate()
	const [currentUser, setCurrentUser] = useState<SectionUserDto | null>(null)
	const [residents, setResidents] = useState<Resident[]>([])
	const [sections, setSections] = useState<SectionDto[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isCreatingUser, setIsCreatingUser] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [createUserError, setCreateUserError] = useState<string | null>(null)
	const [createUserSuccess, setCreateUserSuccess] = useState<string | null>(
		null,
	)
	const [addUserForm, setAddUserForm] = useState(defaultAddUserForm)

	useEffect(() => {
		async function loadDashboard() {
			try {
				const self = await SectionUserApi.getSelfAuthenticated()
				setCurrentUser(self)

				const canView =
					self.role === "landlord" || self.role === "admin"

				if (!canView) return

				const allSections = await SectionApi.getAll()
				setSections(allSections)

				if (self.role === "admin") {
					const users = await UserApi.getAll()
					setResidents(users.map(userToResident))
					return
				}

				const currentSection = await SectionApi.getById(self.sectionId)

				const buildingResidents =
					await SectionUserApi.getUsersByBuilding(
						currentSection.buildingId,
					)

				setResidents(buildingResidents.map(sectionUserToResident))
			} catch (error) {
				if (
					axios.isAxiosError(error) &&
					error.response?.status === 401
				) {
					setError("Log in before opening the admin dashboard.")
					return
				}

				setError("Could not load the admin dashboard.")
			} finally {
				setIsLoading(false)
			}
		}

		void loadDashboard()
	}, [])

	const canViewDashboard =
		currentUser?.role === "landlord" || currentUser?.role === "admin"

	const visibleSections = useMemo(() => {
		const sectionIds = new Set(
			residents
				.map((resident) => resident.sectionId)
				.filter((sectionId): sectionId is number => Boolean(sectionId)),
		)

		return sections.filter((section) => sectionIds.has(section.id))
	}, [residents, sections])

	const assignableSections = useMemo(() => {
		if (currentUser?.role === "admin") return sections
		return sections.filter(
			(section) => section.buildingId === currentUser?.buildingId,
		)
	}, [currentUser, sections])

	const assignableRoles = useMemo<UserRole[]>(() => {
		if (currentUser?.role === "admin") {
			return ["student", "section_admin", "landlord", "admin"]
		}

		return ["student", "section_admin"]
	}, [currentUser])

	useEffect(() => {
		if (addUserForm.sectionId || assignableSections.length === 0) return

		setAddUserForm((current) => ({
			...current,
			sectionId: String(assignableSections[0].id),
		}))
	}, [addUserForm.sectionId, assignableSections])

	const sectionCounts = useMemo(() => {
		return visibleSections.map((section) => ({
			section,
			count: residents.filter(
				(resident) => resident.sectionId === section.id,
			).length,
		}))
	}, [residents, visibleSections])

	const roleCounts = useMemo(() => {
		return residents.reduce<Record<string, number>>((counts, resident) => {
			const role = resident.role ?? "unknown"
			counts[role] = (counts[role] ?? 0) + 1
			return counts
		}, {})
	}, [residents])

	const activeResidents = residents.filter((resident) =>
		managedRoles.includes(resident.role ?? "student"),
	)
	const elevatedUsers = residents.filter((resident) =>
		privilegedRoles.includes(resident.role ?? "student"),
	)
	const maxSectionCount = Math.max(
		...sectionCounts.map((section) => section.count),
		1,
	)

	function updateAddUserForm(
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) {
		const { name, value } = event.target
		setAddUserForm((current) => ({ ...current, [name]: value }))
	}

	async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setCreateUserError(null)
		setCreateUserSuccess(null)

		const sectionId = Number(addUserForm.sectionId)
		if (!sectionId) {
			setCreateUserError("Choose a section before adding a user.")
			return
		}

		setIsCreatingUser(true)

		try {
			const createdUser = await SectionUserApi.create(sectionId, {
				email: addUserForm.email,
				firstName: addUserForm.firstName,
				lastName: addUserForm.lastName,
				roomNumber: Number(addUserForm.roomNumber),
				major: addUserForm.major,
				stayPeriodStart: new Date(addUserForm.stayPeriodStart),
				stayPeriodEnd: new Date(addUserForm.stayPeriodEnd),
				role: addUserForm.role,
			})

			setResidents((current) => [
				...current,
				sectionUserToResident(createdUser),
			])
			setCreateUserSuccess("User added.")
			setAddUserForm({
				...defaultAddUserForm,
				sectionId: addUserForm.sectionId,
			})
		} catch {
			setCreateUserError("Could not add that user.")
		} finally {
			setIsCreatingUser(false)
		}
	}

	if (isLoading) {
		return (
			<AppShell
				title="Admin Dashboard"
				description="Loading housing management data."
			>
				<Spinner />
			</AppShell>
		)
	}

	if (error) {
		return (
			<AppShell
				title="Admin Dashboard"
				description="Overview for landlords and admins."
			>
				<VStack align="start" gap={4}>
					<Text color="#9b2c2c">{error}</Text>
					{error.includes("Log in") ? (
						<Button
							bg="#90d5ff"
							color="#163447"
							borderRadius="12px"
							onClick={() => navigate("/login")}
							_hover={{ bg: "#78c9fb" }}
						>
							Go to login
						</Button>
					) : null}
				</VStack>
			</AppShell>
		)
	}

	if (!canViewDashboard) {
		return (
			<AppShell
				title="Access denied"
				description="This page is only for landlords and admins."
			>
				<Text>You do not have permission to view this dashboard.</Text>
			</AppShell>
		)
	}

	return (
		<AppShell
			title="Admin Dashboard"
			description={
				currentUser?.role === "admin"
					? "System-wide overview of residents, sections, and staff roles."
					: "Building overview of residents, sections, and section admins."
			}
		>
			<VStack align="stretch" gap={6}>
				<Box
					asChild
					bg="white"
					border="1px solid #dce5df"
					borderRadius="16px"
					p={5}
				>
					<form onSubmit={handleCreateUser}>
						<VStack align="stretch" gap={4}>
							<Heading size="md">Add user</Heading>
							<Grid
								templateColumns={{
									base: "1fr",
									md: "repeat(2, 1fr)",
									xl: "repeat(4, 1fr)",
								}}
								gap={4}
							>
								<Field label="Email">
									<Input
										name="email"
										type="email"
										value={addUserForm.email}
										onChange={updateAddUserForm}
										bg="white"
										borderColor={inputBorderColor}
										required
									/>
								</Field>
								<Field label="First name">
									<Input
										name="firstName"
										value={addUserForm.firstName}
										onChange={updateAddUserForm}
										bg="white"
										borderColor={inputBorderColor}
										required
									/>
								</Field>
								<Field label="Last name">
									<Input
										name="lastName"
										value={addUserForm.lastName}
										onChange={updateAddUserForm}
										bg="white"
										borderColor={inputBorderColor}
										required
									/>
								</Field>
								<Field label="Room">
									<Input
										name="roomNumber"
										type="number"
										min={1}
										value={addUserForm.roomNumber}
										onChange={updateAddUserForm}
										bg="white"
										borderColor={inputBorderColor}
										required
									/>
								</Field>
								<Field label="Major">
									<Input
										name="major"
										value={addUserForm.major}
										onChange={updateAddUserForm}
										bg="white"
										borderColor={inputBorderColor}
										required
									/>
								</Field>
								<Field label="Section">
									<select
										name="sectionId"
										value={addUserForm.sectionId}
										onChange={updateAddUserForm}
										style={selectStyle}
										required
									>
										{assignableSections.map((section) => (
											<option
												key={section.id}
												value={section.id}
											>
												{section.name}
											</option>
										))}
									</select>
								</Field>
								<Field label="Role">
									<select
										name="role"
										value={addUserForm.role}
										onChange={updateAddUserForm}
										style={selectStyle}
										required
									>
										{assignableRoles.map((role) => (
											<option key={role} value={role}>
												{formatRole(role)}
											</option>
										))}
									</select>
								</Field>
								<Field label="Stay starts">
									<Input
										name="stayPeriodStart"
										type="date"
										value={addUserForm.stayPeriodStart}
										onChange={updateAddUserForm}
										bg="white"
										borderColor={inputBorderColor}
										required
									/>
								</Field>
								<Field label="Stay ends">
									<Input
										name="stayPeriodEnd"
										type="date"
										value={addUserForm.stayPeriodEnd}
										onChange={updateAddUserForm}
										bg="white"
										borderColor={inputBorderColor}
										required
									/>
								</Field>
							</Grid>
							<HStack justify="space-between" gap={3}>
								<Box>
									{createUserError ? (
										<Text color="#9b2c2c">
											{createUserError}
										</Text>
									) : null}
									{createUserSuccess ? (
										<Text color="#246b45">
											{createUserSuccess}
										</Text>
									) : null}
								</Box>
								<Button
									type="submit"
									bg="#90d5ff"
									color="#163447"
									borderRadius="12px"
									loading={isCreatingUser}
									disabled={assignableSections.length === 0}
									_hover={{ bg: "#78c9fb" }}
								>
									Add user
								</Button>
							</HStack>
						</VStack>
					</form>
				</Box>

				<Grid
					templateColumns={{
						base: "1fr",
						md: "repeat(2, 1fr)",
						xl: "repeat(4, 1fr)",
					}}
					gap={4}
				>
					<StatCard
						label="Residents"
						value={activeResidents.length}
					/>
					<StatCard label="Sections" value={visibleSections.length} />
					<StatCard
						label="Section admins"
						value={roleCounts.section_admin ?? 0}
					/>
					<StatCard
						label="Elevated users"
						value={elevatedUsers.length}
					/>
				</Grid>

				<Grid
					templateColumns={{ base: "1fr", lg: "1.3fr 0.7fr" }}
					gap={4}
				>
					<Box
						bg="white"
						border="1px solid #dce5df"
						borderRadius="16px"
						p={5}
					>
						<Heading size="md" mb={4}>
							Residents per section
						</Heading>
						<VStack align="stretch" gap={3}>
							{sectionCounts.map(({ section, count }) => (
								<HStack key={section.id} gap={4}>
									<Box w={{ base: "96px", md: "150px" }}>
										<Text fontWeight="medium">
											{section.name}
										</Text>
										<Text fontSize="sm" color="#65746b">
											Building {section.buildingId}
										</Text>
									</Box>
									<Box
										flex="1"
										h="12px"
										bg="#edf3ef"
										borderRadius="8px"
										overflow="hidden"
									>
										<Box
											h="full"
											w={`${(count / maxSectionCount) * 100}%`}
											bg="#90d5ff"
										/>
									</Box>
									<Text w="32px" textAlign="right">
										{count}
									</Text>
								</HStack>
							))}
						</VStack>
					</Box>

					<Box
						bg="white"
						border="1px solid #dce5df"
						borderRadius="16px"
						p={5}
					>
						<Heading size="md" mb={4}>
							Roles
						</Heading>
						<VStack align="stretch" gap={3}>
							{Object.entries(roleCounts).map(([role, count]) => (
								<HStack key={role} justify="space-between">
									<Badge
										bg={roleColor(role)}
										color="#1e2a24"
										borderRadius="8px"
										px={3}
										py={1}
									>
										{formatRole(role)}
									</Badge>
									<Text fontWeight="medium">{count}</Text>
								</HStack>
							))}
						</VStack>
					</Box>
				</Grid>

				<Box
					bg="#fbfdfc"
					border="1px solid #e6eee9"
					borderRadius="16px"
					overflowX="auto"
				>
					<Box p={5} pb={2}>
						<Heading size="md">Residents</Heading>
					</Box>
					<Table.Root
						size="sm"
						css={{
							"& th, & td": {
								borderColor: "rgba(118, 139, 127, 0.18)",
							},
						}}
					>
						<Table.Header>
							<Table.Row bg="#f4f8f6">
								<Table.ColumnHeader>Name</Table.ColumnHeader>
								<Table.ColumnHeader>Role</Table.ColumnHeader>
								<Table.ColumnHeader>Section</Table.ColumnHeader>
								<Table.ColumnHeader>Room</Table.ColumnHeader>
								<Table.ColumnHeader>Major</Table.ColumnHeader>
								<Table.ColumnHeader>
									Stay period
								</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{residents.map((resident) => (
								<Table.Row key={resident.userId} bg="white">
									<Table.Cell>
										<Text fontWeight="medium">
											{resident.firstName}{" "}
											{resident.lastName}
										</Text>
										<Text fontSize="sm" color="#65746b">
											{resident.email}
										</Text>
									</Table.Cell>
									<Table.Cell>
										<Badge
											bg={roleColor(resident.role)}
											color="#1e2a24"
											borderRadius="8px"
											px={3}
											py={1}
										>
											{formatRole(resident.role)}
										</Badge>
									</Table.Cell>
									<Table.Cell>
										{sectionName(
											resident.sectionId,
											sections,
										)}
									</Table.Cell>
									<Table.Cell>
										{resident.roomNumber}
									</Table.Cell>
									<Table.Cell>{resident.major}</Table.Cell>
									<Table.Cell>
										{formatDate(resident.stayPeriodStart)} -{" "}
										{formatDate(resident.stayPeriodEnd)}
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				</Box>
			</VStack>
		</AppShell>
	)
}

function Field({ label, children }: { label: string; children: ReactNode }) {
	return (
		<Box>
			<Text
				as="label"
				fontSize="sm"
				color="#65746b"
				mb={1}
				display="block"
			>
				{label}
			</Text>
			{children}
		</Box>
	)
}

function StatCard({ label, value }: { label: string; value: number }) {
	return (
		<Box bg="#f8f9fb" border="1px solid #d8e3dc" borderRadius="16px" p={5}>
			<Text fontSize="sm" color="#65746b" mb={2}>
				{label}
			</Text>
			<Heading size="xl">{value}</Heading>
		</Box>
	)
}

function userToResident(user: UserDto): Resident {
	return {
		userId: user.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		roomNumber: user.roomNumber,
		major: user.major,
		role: user.role,
		sectionId: user.sectionId,
		buildingId: user.buildingId,
		stayPeriodStart: user.stayPeriodStart,
		stayPeriodEnd: user.stayPeriodEnd,
	}
}

function sectionUserToResident(sectionUser: SectionUserDto): Resident {
	return {
		userId: sectionUser.userId,
		email: sectionUser.email,
		firstName: sectionUser.firstName,
		lastName: sectionUser.lastName,
		roomNumber: sectionUser.roomNumber,
		major: sectionUser.major,
		role: sectionUser.role,
		sectionId: sectionUser.sectionId,
		buildingId: sectionUser.buildingId,
		stayPeriodStart: sectionUser.stayPeriodStart,
		stayPeriodEnd: sectionUser.stayPeriodEnd,
	}
}

function sectionName(sectionId: number | undefined, sections: SectionDto[]) {
	if (!sectionId) return "Unassigned"
	return (
		sections.find((section) => section.id === sectionId)?.name ?? sectionId
	)
}

function formatRole(role: string | undefined) {
	if (!role) return "Unknown"
	return role.replace("_", " ")
}

function roleColor(role: string | undefined) {
	switch (role) {
		case "admin":
			return "#ffd6de"
		case "landlord":
			return "#ffe3b3"
		case "section_admin":
			return "#d7f2df"
		case "student":
			return "#deefff"
		default:
			return "#edf3ef"
	}
}

function formatDate(value: Date | string | undefined) {
	if (!value) return "Unknown"
	return new Date(value).toLocaleDateString("en-SE")
}

export const Component = AdminDashboardPage
