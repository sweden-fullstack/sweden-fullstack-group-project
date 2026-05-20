import axios from "axios"
import envConfig from "./env"

const instance = axios.create({
	baseURL: envConfig.backend,
	withCredentials: true,
})

export default instance
