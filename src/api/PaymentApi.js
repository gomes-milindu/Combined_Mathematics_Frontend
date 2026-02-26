import api from '../config/axios';

export const getPayments = (studentId) => {
  return api.get(`/payment?studentId=${studentId}`);
}

export const createPayment = (payload) => {
  return api.post('/payment/create', payload);
}