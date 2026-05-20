import { useEffect, useState } from "react"
import type { Resident, SelectedDayRow } from "../types"
import { formatDate } from "../utils/date"
import styles from "./SectionDutyTable.module.css"

type Props = {
	selectedDateKey: string
	selectedDayRows: SelectedDayRow[]
	residents: Resident[]
	onAssigneeChange: (row: SelectedDayRow, assigneeIds: number[]) => void
	onDeleteTask: (dutyName: string) => void
}

function toggleAssigneeId(ids: number[], id: number): number[] {
	if (ids.includes(id)) return ids.filter((x) => x !== id)
	return [...ids, id]
}

export default function SectionDutyTable({
	selectedDateKey,
	selectedDayRows,
	residents,
	onAssigneeChange,
	onDeleteTask,
}: Props) {
	const [pendingDelete, setPendingDelete] = useState<SelectedDayRow | null>(
		null,
	)

	useEffect(() => {
		if (!pendingDelete) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setPendingDelete(null)
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [pendingDelete])

	function confirmDelete() {
		if (!pendingDelete) return
		onDeleteTask(pendingDelete.name)
		setPendingDelete(null)
	}

	return (
		<>
			<h2 className={styles.title}>{formatDate(selectedDateKey)}</h2>
			<p className={styles.subtitle}>Cleaning Schedule</p>

			<div className={styles.list}>
				{selectedDayRows.length > 0 ? (
					<div className={styles.tableShell}>
						<table className={styles.table}>
							<thead>
								<tr>
									<th className={styles.headCell}>Duty</th>
									<th className={styles.headCell}>
										Assigned resident
									</th>
									<th
										className={`${styles.headCell} ${styles.headCellNarrow}`}
									>
										Action
									</th>
								</tr>
							</thead>
							<tbody className={styles.tbody}>
								{selectedDayRows.map((row) => (
									<tr key={row.name}>
										<td className={styles.td}>
											<p className={styles.dutyName}>
												{row.name}
											</p>
										</td>
										<td className={styles.td}>
											{residents.length === 0 ? (
												<p
													className={
														styles.noResidents
													}
												>
													No residents in this
													section.
												</p>
											) : (
												<div className={styles.pills}>
													{residents.map((r) => {
														const on =
															row.assigneeIds.includes(
																r.id,
															)
														return (
															<button
																key={r.id}
																type="button"
																className={
																	on
																		? `${styles.pill} ${styles.pillSelected}`
																		: styles.pill
																}
																onClick={() =>
																	onAssigneeChange(
																		row,
																		toggleAssigneeId(
																			row.assigneeIds,
																			r.id,
																		),
																	)
																}
															>
																{r.name}
															</button>
														)
													})}
												</div>
											)}
										</td>
										<td className={styles.td}>
											<button
												type="button"
												className={styles.deleteBtn}
												onClick={() =>
													setPendingDelete(row)
												}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p className={styles.empty}>
						No cleaning duties for this section yet. Add one below
						to get started.
					</p>
				)}
			</div>

			{pendingDelete ? (
				<div
					className={styles.overlay}
					role="presentation"
					onClick={() => setPendingDelete(null)}
				>
					<div
						className={styles.dialog}
						role="dialog"
						aria-modal="true"
						aria-labelledby="delete-duty-title"
						onClick={(e) => e.stopPropagation()}
					>
						<h3
							id="delete-duty-title"
							className={styles.dialogTitle}
						>
							Delete cleaning duty
						</h3>
						<p className={styles.dialogBody}>
							Are you sure you want to delete the duty &quot;
							{pendingDelete.name}&quot; from this section?
							Existing assignments on all days for this duty will
							also be removed. This cannot be undone.
						</p>
						<div className={styles.dialogActions}>
							<button
								type="button"
								className={styles.btnGhost}
								onClick={() => setPendingDelete(null)}
							>
								Cancel
							</button>
							<button
								type="button"
								className={styles.btnDanger}
								onClick={confirmDelete}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}
