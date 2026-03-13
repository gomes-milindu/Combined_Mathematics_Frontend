import api from '../config/axios';


export const getPricing = (institute, batch) => {
  return api.get('http://localhost:8080/pricing', {
    params: { institute, batch }
  });
};