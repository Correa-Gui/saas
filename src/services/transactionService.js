// src/services/transactionService.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' }
});

export const getTransactions   = bancaId => api.get(`/bancas/${bancaId}/transactions`);
export const createTransaction = tx      => api.post('/transactions', tx);
export const getBalance        = bancaId => api.get(`/bancas/${bancaId}/balance`);
export const getBancaFull      = bancaId => api.get(`/bancas/${bancaId}/full`);
export const getAllTransactions = () => api.get('/transactions');