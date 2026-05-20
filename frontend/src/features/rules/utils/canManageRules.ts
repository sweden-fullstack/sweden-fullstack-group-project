import UserRole from "@/shared/types/user-role/userRole"

export function canManageRules(role?: UserRole): boolean {
	return role === "landlord" || role === "admin" || role === "section_admin"
}
