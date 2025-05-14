// src/services/bancaService.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' }
});

export const getBancas   = () => api.get('/bancas');
export const createBanca = banca => api.post('/bancas', banca);
export const updateBanca = (id, banca) => api.put(`/bancas/${id}`, banca);
export const deleteBanca = id => api.delete(`/bancas/${id}`);
