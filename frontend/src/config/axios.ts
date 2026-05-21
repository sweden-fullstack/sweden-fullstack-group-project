import axios from "axios"
import envConfig from "./env"

const axiosInstance = axios.create({
	baseURL: envConfig.backend,
	withCredentials: true,
})

export default axiosInstance
