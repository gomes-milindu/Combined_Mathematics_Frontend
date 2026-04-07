import api from '../config/axios';


export const getPricing = (institute, batch) => {
  return api.get('/pricing', {
    params: { institute, batch }
  });
};