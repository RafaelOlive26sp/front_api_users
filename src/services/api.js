import axios from "axios";
import Cookies from "js-cookie";


const api = axios.create({
  baseURL: "https://api-users-rafael.up.railway.app/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
})
 api.interceptors.request.use((config) => {
   const token = Cookies.get('token');
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
 })
export default api
