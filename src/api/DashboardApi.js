import axios from "axios";

export const getStats = () => {
  return axios.get("http://localhost:8080/dashboard");
}