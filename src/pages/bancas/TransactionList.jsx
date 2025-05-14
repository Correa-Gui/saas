// src/pages/bancas/TransactionList.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Snackbar,
  Alert
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useParams, useNavigate } from 'react-router-dom';

import { getBancas } from '../../services/bancaService';
import {
  getTransactions,
  createTransaction,
  getBalance
} from '../../services/transactionService';
import TransactionForm from './TransactionForm';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1
};

const TransactionList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bancas, setBancas] = useState([]);
  const [bancaId, setBancaId] = useState(id ? Number(id) : '');
  const [txs, setTxs] = useState([]);
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadBancas();
  }, []);

  useEffect(() => {
    if (bancaId) loadAll();
  }, [bancaId]);

  const showToast = (msg, sev = 'success') => {
    setToast({ open: true, message: msg, severity: sev });
  };

  const loadBancas = async () => {
    try {
      const { data } = await getBancas();
      setBancas(data);
      if (!id && data.length) setBancaId(data[0].id);
    } catch (err) {
      console.error('Erro ao carregar bancas', err);
      showToast('Falha ao carregar bancas', 'error');
    }
  };

  const loadAll = async () => {
    try {
      const [{ data: txData }, { data: bal }] = await Promise.all([
        getTransactions(bancaId),
        getBalance(bancaId)
      ]);
      setTxs(txData);
      setBalance(bal);
    } catch (err) {
      console.error('Erro ao carregar transações', err);
      showToast('Falha ao carregar transações', 'error');
    }
  };

  const handleAdd = async (values, actions) => {
    try {
      const amt = Number(values.amount);
      const signedAmount = values.type === 'withdrawal' ? -Math.abs(amt) : amt;
      await createTransaction({ banca_id: bancaId, type: values.type, amount: signedAmount, description: values.description });
      actions.resetForm();
      setOpen(false);
      loadAll();
      showToast('Transação cadastrada com sucesso');
    } catch (err) {
      console.error('Erro ao criar transação', err);
      showToast('Falha ao criar transação', 'error');
    }
  };

  const columns = [
    { field: 'id', headerName: '#', width: 70, headerAlign: 'center', align: 'center' },
    {
      field: 'type',
      headerName: 'Tipo',
      flex: 1,
      valueFormatter: ({ value }) => (value === 'deposit' ? 'Depósito' : 'Saque')
    },
    { field: 'amount', headerName: 'Valor', type: 'number', flex: 1, headerAlign: 'right', align: 'right' },
    { field: 'description', headerName: 'Descrição', flex: 2 },
    { field: 'created_at', headerName: 'Data', flex: 1 }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <FormControl>
          <InputLabel id="banca-select-label">Banca</InputLabel>
          <Select
            labelId="banca-select-label"
            value={bancaId}
            label="Banca"
            onChange={e => setBancaId(Number(e.target.value))}
          >
            {bancas.map(b => (
              <MenuItem key={b.id} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h6">Saldo: {balance.toFixed(2)}</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Nova Transação
        </Button>
        <Button variant="text" onClick={() => navigate('/transactions')}>
          Visualizar Todas
        </Button>
      </Box>

      <Box sx={{ height: 400 }}>
        <DataGrid rows={txs} columns={columns} pageSize={10} rowsPerPageOptions={[5, 10]} />
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={styleModal}>
          <TransactionForm onSubmit={handleAdd} onCancel={() => setOpen(false)} />
        </Box>
      </Modal>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast(t => ({ ...t, open: false }))}
      >
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default TransactionList;