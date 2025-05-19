import axios from "axios";

const API_URL = "http://localhost:8000/fornecedores";

export async function listarFornecedores(limit, offset, busca) {
  const response = await axios.get(API_URL, {
    params: { limit, offset, busca }
  });
  return response.data;
}

export async function criarFornecedor(data) {
  const response = await axios.post(API_URL, data);
  return response.data;
}

export async function atualizarFornecedor(id, data) {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}

export async function deletarFornecedor(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}
export async function obterFornecedor(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}