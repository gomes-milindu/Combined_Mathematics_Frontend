import api from '../config/axios';

export const getStudents = (page = 1, limit = 10, searchQuery = "") => {
  const params = { page, limit };
  const query = (searchQuery || "").trim();
  if (query) {
    params.search = query;
  }
  return api.get('/student', { params });
}

export const deleteStudent = (id) => {
  return api.delete(`student/${id}`);
}

export const  createStudent = (studentData) => {
  return api.post('/student', studentData);
}

export const editStudent = (id)=>{
  return api.get(`student/${id}`);
}

export const viewStudent = (id)=>{
  return api.get(`student/${id}`);
}

export const updateEdit =(id, form)=>{
  return api.put(`student/${id}`, form);
}