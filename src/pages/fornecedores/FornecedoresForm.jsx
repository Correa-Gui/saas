import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTitle from 'components/PageTitle';

export default function FornecedorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ NOME: '', CNPJ: '', TELEFONE: '', CONTATO: '' });

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/fornecedores/${id}`)
        .then(r => r.json())
        .then(data => setForm(data));
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/fornecedores/${id}` : '/api/fornecedores';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => navigate('/fornecedores'));
  };

  return (
    <div className="p-4">
      <PageTitle>{isEdit ? 'Editar Fornecedor' : 'Novo Fornecedor'}</PageTitle>
      <form onSubmit={handleSubmit}>
        {['NOME','CNPJ','TELEFONE','CONTATO'].map(field => (
          <div className="mb-3" key={field}>
            <label>{field}</label>
            <input
              name={field}
              value={form[field] || ''}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Salvar' : 'Criar'}
        </button>
      </form>
    </div>
  );
}
