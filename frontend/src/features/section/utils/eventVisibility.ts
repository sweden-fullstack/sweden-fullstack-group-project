import type { SectionEventVisibility } from "@/shared/types/section-event/sectionEvent.dto"

export const VISIBILITY_OPTIONS: {
	value: SectionEventVisibility
	label: string
}[] = [
	{ value: "building", label: "Everyone in the building" },
	{ value: "section", label: "Only my section" },
]

export function applyVisibilityToSectionId(
	visibility: SectionEventVisibility,
	sectionId: number,
): number | undefined {
	return visibility === "section" ? sectionId : undefined
}
