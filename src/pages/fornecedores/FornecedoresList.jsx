import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'components/PageTitle';

export default function FornecedoresList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/fornecedores')
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <div className="p-4">
      <PageTitle>Fornecedores</PageTitle>
      <Link to="/fornecedores/add" className="btn btn-primary mb-2">+ Novo</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>CNPJ</th><th>Telefone</th><th>Contato</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(f => (
            <tr key={f.ID}>
              <td>{f.ID}</td>
              <td>{f.NOME}</td>
              <td>{f.CNPJ}</td>
              <td>{f.TELEFONE}</td>
              <td>{f.CONTATO}</td>
              <td>
                <Link to={`/fornecedores/${f.ID}`} className="btn btn-sm btn-secondary">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
