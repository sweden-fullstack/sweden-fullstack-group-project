import type { SectionEventVisibility } from "@/shared/types/section-event/sectionEvent.dto"

export const VISIBILITY_OPTIONS: {
	value: SectionEventVisibility
	label: string
}[] = [
	{ value: "building", label: "Everyone in the building" },
	{ value: "section", label: "Only this section" },
]
