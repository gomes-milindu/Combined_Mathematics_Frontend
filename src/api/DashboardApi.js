import axios from "axios";
import api from "../config/axios";

// export const getStats = () => {
//   return axios.get("http://localhost:8080/dashboard");
// }

export const getStats = () => {
  // The 'api' instance already knows the baseURL (http://localhost:8080)
  return api.get("/dashboard");
};