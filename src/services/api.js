import axios from "axios";
import Cookies from "js-cookie";


const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
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
