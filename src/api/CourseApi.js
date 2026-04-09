import axios from "axios";
import api from "../config/axios"

// export const createCourse = () => {
//   return axios.post("http://localhost:8080/addcourse");
// }

// export const getCourses = () => {
//   return axios.get("http://localhost:8080/addcourse");
// }

// Use the instance instead of the global axios object
export const createCourse = (courseData) => {
  // The baseURL is already prepended, so we just use the endpoint
  return api.post("/addcourse", courseData);
};

export const getCourses = () => {
  return api.get("/addcourse");
};