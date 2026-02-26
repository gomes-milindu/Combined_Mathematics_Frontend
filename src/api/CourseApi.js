import axios from "axios";

export const createCourse = () => {
  return axios.post("http://localhost:8080/addcourse");
}

export const getCourses = () => {
  return axios.get("http://localhost:8080/addcourse");
}