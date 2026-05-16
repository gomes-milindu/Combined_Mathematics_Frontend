import api from '../config/axios';

export const getStats = () => {
  return api.get('/dashboard');
}