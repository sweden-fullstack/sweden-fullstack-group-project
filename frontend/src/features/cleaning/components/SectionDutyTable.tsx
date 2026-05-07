import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import type { Resident, SelectedDayRow } from "../types"
import { formatDate } from "../utils/date"

type Props = {
	selectedDateKey: string
	isSelectedDayDisabled: boolean
	selectedDayRows: SelectedDayRow[]
	residents: Resident[]
	onClearDay: () => void
	onAssigneeChange: (dutyName: string, assigneeIdValue: string) => void
	onDeleteTask: (dutyName: string) => void
}

export default function SectionDutyTable({
	selectedDateKey,
	isSelectedDayDisabled,
	selectedDayRows,
	residents,
	onClearDay,
	onAssigneeChange,
	onDeleteTask,
}: Props) {
	return (
		<>
			<Heading size="sm" mb={2}>
				{formatDate(selectedDateKey)}
			</Heading>
			<HStack justify="space-between" mb={4}>
				<Text fontSize="sm" color="#6a7a71">
					Cleaning Schedule
				</Text>
				<Button
					size="sm"
					variant="outline"
					borderColor="#c6d9ee"
					color="#345a7d"
					onClick={onClearDay}
				>
					Clear this day
				</Button>
			</HStack>
			{isSelectedDayDisabled ? (
				<Text fontSize="sm" color="#718176" mb={4}>
					This day is marked as no-cleaning.
				</Text>
			) : null}

			<VStack align="stretch" gap={3}>
				{selectedDayRows.length ? (
					<Box
						border="1px solid #d5e3f3"
						borderRadius="12px"
						overflowX="auto"
						bg="#fdfefe"
					>
						<Box
							as="table"
							w="100%"
							borderCollapse="collapse"
							fontSize="sm"
						>
							<Box as="thead">
								<Box as="tr" bg="#f3f8ff">
									<Box
										as="th"
										textAlign="left"
										px={3}
										py={2}
										borderBottom="1px solid #d5e3f3"
										color="#274d72"
										fontWeight="600"
									>
										Duty
									</Box>
									<Box
										as="th"
										textAlign="left"
										px={3}
										py={2}
										borderBottom="1px solid #d5e3f3"
										color="#274d72"
										fontWeight="600"
									>
										Assigned resident
									</Box>
									<Box
										as="th"
										textAlign="left"
										px={3}
										py={2}
										borderBottom="1px solid #d5e3f3"
										color="#274d72"
										fontWeight="600"
										w="96px"
									>
										Action
									</Box>
								</Box>
							</Box>
							<Box as="tbody">
								{selectedDayRows.map((row, index) => (
									<Box
										as="tr"
										key={row.name}
										bg={
											index % 2 === 0
												? "white"
												: "#f9fcff"
										}
									>
										<Box
											as="td"
											px={3}
											py={2}
											borderBottom="1px solid #e5edf7"
										>
											<Text color="#355270">
												{row.name}
											</Text>
										</Box>
										<Box
											as="td"
											px={3}
											py={2}
											borderBottom="1px solid #e5edf7"
										>
											<select
												value={String(
													row.assigneeId ?? "",
												)}
												onChange={(event) =>
													onAssigneeChange(
														row.name,
														event.target.value,
													)
												}
												style={{
													width: "100%",
													minWidth: "190px",
													border: "1px solid #d4e2f1",
													borderRadius: "6px",
													padding: "0 10px",
													height: "34px",
													background: "#fff",
												}}
											>
												<option value="">Blank</option>
												{residents.map((resident) => (
													<option
														key={resident.id}
														value={resident.id}
													>
														{resident.name}
													</option>
												))}
											</select>
										</Box>
										<Box
											as="td"
											px={3}
											py={2}
											borderBottom="1px solid #e5edf7"
										>
											<Button
												size="xs"
												bg="#ffecee"
												color="#8a2d3b"
												onClick={() =>
													onDeleteTask(row.name)
												}
											>
												Delete
											</Button>
										</Box>
									</Box>
								))}
							</Box>
						</Box>
					</Box>
				) : (
					<Text color="#718176">No duties match this filter.</Text>
				)}
			</VStack>
		</>
	)
}
