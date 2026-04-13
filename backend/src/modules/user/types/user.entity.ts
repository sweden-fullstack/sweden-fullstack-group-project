/**
 * Object as it is stored in the database, NOT TO BE RETURNED AS IS SINCE IT MAY CONTAIN SENSITIVE INFO!
 * @see UserDto
 */
type UserEntity = {
	username: string
	gmail: string
}

export default UserEntity
