export function removeUndefined<T>(obj: T): Partial<T> {
	return Object.fromEntries(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
		Object.entries(obj as any).filter(([_, v]) => v !== undefined),
	) as Partial<T>
}
