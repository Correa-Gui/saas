import React, { useEffect, useState } from "react";
import DataTable from "components/DataTable";
import ConfirmDialog from "components/ConfirmDialog";
import FornecedorForm from "./FornecedorForm";
import FornecedorDetailsCard from "./FornecedorDetails";

import {
  listarFornecedores,
  criarFornecedor,
  atualizarFornecedor,
  deletarFornecedor,
} from "services/fornecedores";

export default function FornecedoresList() {
  // Estados
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    total: 0,
  });
  const [filterBusca, setFilterBusca] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedFornecedor, setExpandedFornecedor] = useState(null);

  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);

  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Colunas da tabela
  const columns = [
    { title: "Código", field: "CODIGO_FORNECEDOR", width: 80 },
    {
      title: "Nome",
      field: "NOME",
      render: (val, row) => (
        <>
          {val}
        </>
      ),
    },
    { title: "Tipo", field: "TIPO" },
    { title: "CNPJ", field: "CNPJ" },
    { title: "CEP", field: "CEP" },
  ];

  // Função para carregar dados do backend
  async function fetchFornecedores(page, rowsPerPage, busca, status) {
    setLoading(true);
    try {
      const offset = page * rowsPerPage;
      const response = await listarFornecedores({
        limit: rowsPerPage,
        offset,
        busca,
        status,
      });
      setData(response.data);
      setPagination((p) => ({ ...p, total: response.total, page, rowsPerPage }));
    } catch (error) {
      console.error("Erro ao carregar fornecedores", error);
    } finally {
      setLoading(false);
    }
  }

  // Efeito para carregar a primeira página e atualizar filtros
  useEffect(() => {
    fetchFornecedores(pagination.page, pagination.rowsPerPage, filterBusca, filterStatus);
  }, [pagination.page, pagination.rowsPerPage, filterBusca, filterStatus]);

  // Handlers tabela
  const handlePageChange = (newPage) => {
    setPagination((p) => ({ ...p, page: newPage }));
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setPagination((p) => ({ ...p, rowsPerPage: newRowsPerPage, page: 0 }));
  };

  const handleFilterChange = (name, value) => {
    if (name === "busca") setFilterBusca(value);
    else if (name === "status") setFilterStatus(value);
    setPagination((p) => ({ ...p, page: 0 })); // reset página
  };

  // Ações
  const handleView = (fornecedor) => {
    setExpandedFornecedor(expandedFornecedor === fornecedor.CODIGO_FORNECEDOR ? null : fornecedor.CODIGO_FORNECEDOR);
  };

  const handleToggleExpandRow = (rowId) => {
    setExpandedFornecedor(expandedFornecedor === rowId ? null : rowId);
  };

  const handleAdd = () => {
    setModoEdicao(false);
    setFornecedorSelecionado(null);
    setModalFormOpen(true);
  };

  const handleEdit = (fornecedor) => {
    setModoEdicao(true);
    setFornecedorSelecionado(fornecedor);
    setModalFormOpen(true);
  };

  const handleDelete = (fornecedor) => {
    setFornecedorSelecionado(fornecedor);
    setModalConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deletarFornecedor(fornecedorSelecionado.CODIGO_FORNECEDOR);
      setModalConfirmOpen(false);
      fetchFornecedores(pagination.page, pagination.rowsPerPage, filterBusca, filterStatus);
    } catch (error) {
      console.error("Erro ao deletar fornecedor", error);
    }
  };

  const handleSave = async (dados) => {
    try {
      if (modoEdicao) await atualizarFornecedor(fornecedorSelecionado.CODIGO_FORNECEDOR, dados);
      else await criarFornecedor(dados);
      setModalFormOpen(false);
      fetchFornecedores(pagination.page, pagination.rowsPerPage, filterBusca, filterStatus);
    } catch (error) {
      console.error("Erro ao salvar fornecedor", error);
    }
  };

  // Renderiza detalhes na linha expandida
  const renderRowDetails = (row) => (
    <FornecedorDetailsCard fornecedor={row} />
  );

  return (
    <>
      <DataTable
        title="Fornecedores"
        filters={[
          { label: "Pesquisar", name: "busca", type: "text" },
          {
            label: "Status",
            name: "status",
            type: "select",
            options: [
              { label: "Todos", value: "" },
              { label: "Verificado", value: "verificado" },
              { label: "Pendente", value: "pendente" },
              { label: "Indeferido", value: "indeferido" },
            ],
          },
        ]}
        filterValues={{ busca: filterBusca, status: filterStatus }}
        onFilterChange={handleFilterChange}
        columns={columns}
        data={data}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowDetailsRender={renderRowDetails}
        expandedRow={expandedFornecedor}
        onToggleExpandRow={handleToggleExpandRow}
      />

      <FornecedorForm
        open={modalFormOpen}
        fornecedor={modoEdicao ? fornecedorSelecionado : null}
        onClose={() => setModalFormOpen(false)}
        onSave={handleSave}
      />

     <ConfirmDialog
      open={modalConfirmOpen}
      title="Tem certeza que deseja excluir?"
      message={`Ao excluir o fornecedor "${fornecedorSelecionado?.NOME}", essa ação não pode ser desfeita.`}
      onCancel={() => setModalConfirmOpen(false)}
      onConfirm={confirmDelete}
/>

    </>
  );
}
