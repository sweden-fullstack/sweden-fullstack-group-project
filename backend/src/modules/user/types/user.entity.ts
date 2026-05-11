/**
 * Object as it is stored in the database, NOT TO BE RETURNED AS IS SINCE IT MAY CONTAIN SENSITIVE INFO!
 * @see UserDto
 */
type UserEntity = {
	id: number
	email: string
	firstName: string
	lastName: string
	sectionId: number
}

export default UserEntity
