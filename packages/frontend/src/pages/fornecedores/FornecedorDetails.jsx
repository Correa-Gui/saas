import React from "react";
import { Card, CardContent, Typography, Grid, Divider, Stack } from "@mui/material";
import { UserOutlined } from "@ant-design/icons";

export default function FornecedorDetailsCard({ fornecedor }) {
  if (!fornecedor) return null;

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "#F4F6F8",
        borderRadius: 2,
        boxShadow: "0 2px 12px rgba(145,158,171,0.04)",
        p: 2,
        mt: 1,
        mb: 1,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <UserOutlined style={{ fontSize: 30, color: "#919EAB" }} />
          <Typography variant="h6" fontWeight={700}>
            {fornecedor.NOME}
          </Typography>
          <Typography
            sx={{
              ml: 2,
              fontSize: 13,
              bgcolor: "#E3F2FD",
              px: 1.2,
              py: 0.5,
              borderRadius: 1,
              color: "#1976d2",
              fontWeight: 500,
            }}
          >
            {fornecedor.TIPO || "Tipo não informado"}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">CNPJ</Typography>
            <Typography>{fornecedor.CNPJ || "-"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">CEP</Typography>
            <Typography>{fornecedor.CEP || "-"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">Fantasia</Typography>
            <Typography>{fornecedor.FANTASIA || "-"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">IE</Typography>
            <Typography>{fornecedor.IE || "-"}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">Endereço</Typography>
            <Typography>
              {fornecedor.ENDERECO || "-"}, {fornecedor.NUMERO || ""}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">Bairro</Typography>
            <Typography>{fornecedor.BAIRRO || "-"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">Cidade</Typography>
            <Typography>{fornecedor.CODIGO_CIDADE || "-"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">Telefone</Typography>
            <Typography>{fornecedor.TELEFONE || "-"}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">E-mail</Typography>
            <Typography>{fornecedor.EMAIL || "-"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">Grupo</Typography>
            <Typography>{fornecedor.CODIGO_GRUPO || "-"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">Data</Typography>
            <Typography>{fornecedor.DATA || "-"}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
