
import axios from "axios"

const instance = axios.create({
  baseURL: "https://bookmandu.onrender.com", 
  withCredentials: true, 
})

export default instance
