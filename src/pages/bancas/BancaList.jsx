// src/pages/bancas/BancaList.jsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, Typography, IconButton } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

import BancaForm from './BancaForm';
import {
  getBancas,
  createBanca as apiCreate,
  updateBanca as apiUpdate,
  deleteBanca as apiDelete
} from '../../services/bancaService';
import { getBalance } from '../../services/transactionService';

const styleModal = {
  position: 'absolute', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1
};

const BancaList = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBancas();
  }, []);

  const fetchBancas = async () => {
    const { data } = await getBancas();
    // para cada banca, buscar balance
    const enhanced = await Promise.all(
      data.map(async b => {
        const { data: bal } = await getBalance(b.id);
        return {
          id: b.id,
          bookmaker: b.bookmaker,
          name: b.name,
          initialValue: b.initial_value,
          balance: bal
        };
      })
    );
    setRows(enhanced);
  };

  const handleAdd = () => { setEditRow(null); setOpen(true); };
  const handleEdit = row => { setEditRow({ ...row }); setOpen(true); };
  const handleDelete = async id => { await apiDelete(id); fetchBancas(); };
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      bookmaker: values.bookmaker,
      name: values.name,
      initial_value: values.initialValue
    };
    if (editRow) await apiUpdate(editRow.id, payload);
    else await apiCreate(payload);
    resetForm();
    setOpen(false);
    fetchBancas();
  };

  const columns = [
    { field:'id', headerName:'#', width:80, headerAlign:'center', align:'center' },
    { field:'bookmaker', headerName:'Casa de Aposta', flex:1, headerAlign:'left', align:'left' },
    { field:'name', headerName:'Nome da Banca', flex:1, headerAlign:'left', align:'left' },
    { field:'initialValue', headerName:'Inicial', type:'number', flex:0.7, headerAlign:'right', align:'right' },
    { field:'balance', headerName:'Saldo Atual', type:'number', flex:0.7, headerAlign:'right', align:'right' },
    {
      field:'transactions',
      headerName:'Transações',
      width:100,
      renderCell: params => (
        <IconButton size="small" onClick={()=>navigate(`/bancas/${params.id}/transactions`)}>
          <ListAltOutlinedIcon color="action" />
        </IconButton>
      )
    },
    {
      field:'actions', headerName:'Ações', type:'actions', width:100,
      getActions: params => [
        <GridActionsCellItem icon={<VisibilityOutlinedIcon color="action"/>} label="Ver" onClick={()=>console.log('view',params.id)} showInMenu={false}/>,
        <GridActionsCellItem icon={<EditOutlinedIcon color="primary"/>} label="Editar" onClick={()=>handleEdit(params.row)} showInMenu={false}/>,
        <GridActionsCellItem icon={<DeleteOutlineIcon color="error"/>} label="Deletar" onClick={()=>handleDelete(params.id)} showInMenu={false}/>
      ]
    }
  ];

  return (
    <Box sx={{ p:3 }}>
      <Box sx={{ display:'flex', justifyContent:'space-between', mb:2 }}>
        <Typography variant="h4">Listagem de Bancas</Typography>
        <Button variant="contained" startIcon={<AddOutlinedIcon />} onClick={handleAdd}>
          Add Banca
        </Button>
      </Box>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[5,10,25]} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <BancaForm
            initialValues={editRow || undefined}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default BancaList;
