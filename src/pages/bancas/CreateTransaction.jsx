// src/pages/bancas/CreateTransaction.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { getBancas } from '../../services/bancaService';
import { createTransaction } from '../../services/transactionService';

const schema = Yup.object({
  banca_id: Yup.number().required('Obrigatório'),
  type: Yup.string().oneOf(['deposit', 'withdrawal']).required('Obrigatório'),
  amount: Yup.number().required('Obrigatório')
});

const CreateTransaction = () => {
  const [bancas, setBancas] = useState([]);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getBancas();
        setBancas(data);
      } catch (err) {
        console.error('Erro ao carregar bancas', err);
        setToast({ open: true, message: 'Falha ao carregar bancas', severity: 'error' });
      }
    })();
  }, []);

  const showToast = (msg, sev = 'success') => setToast({ open: true, message: msg, severity: sev });

  const initialValues = { banca_id: '', type: 'deposit', amount: '', description: '' };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const amt = Number(values.amount);
      const signedAmount = values.type === 'withdrawal' ? -Math.abs(amt) : amt;
      await createTransaction({
        banca_id: values.banca_id,
        type: values.type,
        amount: signedAmount,
        description: values.description
      });
      showToast('Transação cadastrada com sucesso');
      resetForm();
      navigate('/transactions');
    } catch (err) {
      console.error('Erro ao criar transação', err);
      showToast('Falha ao criar transação', 'error');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Nova Transação
      </Typography>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <FormControl fullWidth margin="normal" error={touched.banca_id && Boolean(errors.banca_id)}>
              <InputLabel id="banca-id-label">Banca</InputLabel>
              <Select
                labelId="banca-id-label"
                id="banca_id"
                name="banca_id"
                value={values.banca_id}
                label="Banca"
                onChange={handleChange}
              >
                {bancas.map(b => (
                  <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" error={touched.type && Boolean(errors.type)}>
              <InputLabel id="type-label">Tipo</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={values.type}
                label="Tipo"
                onChange={handleChange}
              >
                <MenuItem value="deposit">Depósito</MenuItem>
                <MenuItem value="withdrawal">Saque</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              id="amount"
              name="amount"
              label="Valor"
              type="number"
              value={values.amount}
              onChange={handleChange}
              error={touched.amount && Boolean(errors.amount)}
              helperText={touched.amount && errors.amount}
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              margin="normal"
              id="description"
              name="description"
              label="Descrição"
              value={values.description}
              onChange={handleChange}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="text" color="error" type="reset" sx={{ mr: 1 }}>
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Salvar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))}>
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateTransaction;
