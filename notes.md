ROUTES

auth

/auth GET -- Sign in, account must exist before, google sign in \* Uses google sign in

section-user

/building/:buildingId GET -- Get all users belonging to a building _ user must be authenticated and belong to the building or be admin PRIORITY 2
/section/:sectionId GET -- Get all users belonging to section _ user must be authenticated and belong to building or be admin PRIORITY 2
/userToSection POST -- Create user belonging to section _ user must be authenticated and be landlord or admin
/userToSection PUT -- Update user belong to section _ user must be authenticated and be landlord or admin
/userToSection/:id DELETE -- Delete user \* User must be authenticated, may be admin, landlord

user

/ GET -- Get all users \* Perhaps only for admins?
/ PUT -- Update self data for user \* User must be authenticated and only if admin or self user
/ DELETE -- User deletes themselves? Priority 3
