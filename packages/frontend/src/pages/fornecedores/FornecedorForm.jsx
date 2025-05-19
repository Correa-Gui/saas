import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Grid,
  Avatar,
} from "@mui/material";
import { UserOutlined } from "@ant-design/icons"; // Ou qualquer ícone de avatar

export default function FornecedorForm({
  open,
  fornecedor,
  onClose,
  onSave,
}) {
  const [form, setForm] = React.useState({
    NOME: "",
    TIPO: "",
    CNPJ: "",
    CEP: "",
    FANTASIA: "",
    IE: "",
    ENDERECO: "",
    BAIRRO: "",
    NUMERO: "",
    CODIGO_CIDADE: "",
    TELEFONE: "",
    DATA: "",
    EMAIL: "",
    CODIGO_GRUPO: "",
  });

  useEffect(() => {
    if (fornecedor) setForm(fornecedor);
    else setForm({
      NOME: "",
      TIPO: "",
      CNPJ: "",
      CEP: "",
      FANTASIA: "",
      IE: "",
      ENDERECO: "",
      BAIRRO: "",
      NUMERO: "",
      CODIGO_CIDADE: "",
      TELEFONE: "",
      DATA: "",
      EMAIL: "",
      CODIGO_GRUPO: "",
    });
  }, [fornecedor, open]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {fornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
      </DialogTitle>
      <DialogContent dividers>
        <form id="fornecedor-form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Avatar */}
            <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
              <Avatar
                sx={{ width: 64, height: 64, bgcolor: "#f5f6fa" }}
                alt={form.NOME || "Fornecedor"}
                src=""
              >
                <UserOutlined style={{ fontSize: 40, color: "#b1b1b1" }} />
              </Avatar>
            </Grid>

            {/* Campos em duas colunas */}
            <Grid item xs={12} md={10}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nome"
                    name="NOME"
                    value={form.NOME}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Tipo"
                    name="TIPO"
                    value={form.TIPO}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="CNPJ"
                    name="CNPJ"
                    value={form.CNPJ}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="CEP"
                    name="CEP"
                    value={form.CEP}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Fantasia"
                    name="FANTASIA"
                    value={form.FANTASIA}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="IE"
                    name="IE"
                    value={form.IE}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={8}>
                  <TextField
                    label="Endereço"
                    name="ENDERECO"
                    value={form.ENDERECO}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Bairro"
                    name="BAIRRO"
                    value={form.BAIRRO}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    label="Número"
                    name="NUMERO"
                    value={form.NUMERO}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Cidade"
                    name="CODIGO_CIDADE"
                    value={form.CODIGO_CIDADE}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Telefone"
                    name="TELEFONE"
                    value={form.TELEFONE}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Data"
                    name="DATA"
                    value={form.DATA}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    name="EMAIL"
                    value={form.EMAIL}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Código Grupo"
                    name="CODIGO_GRUPO"
                    value={form.CODIGO_GRUPO}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          type="submit"
          form="fornecedor-form"
          variant="contained"
          color="primary"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
