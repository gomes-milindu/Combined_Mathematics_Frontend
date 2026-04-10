import api from '../config/axios';

// Create course
export const createCourse = (courseData) => {
  return api.post('/addcourse', courseData);
}

// Get all courses
export const getCourses = () => {
  return api.get('/addcourse');
}