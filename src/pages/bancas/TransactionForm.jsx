// src/pages/bancas/TransactionForm.jsx
import { Snackbar, Alert } from '@mui/material';

import React from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  type: Yup.string()
    .oneOf(['deposit','withdrawal','bet','settlement','adjustment'])
    .required('Obrigatório'),
  amount: Yup.number().required('Obrigatório')
});

const TransactionForm = ({ onSubmit, onCancel }) => (
  <Box sx={{ p:3, minWidth:360 }}>
    <Formik
      initialValues={{ type: '', amount: '', description: '' }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">Tipo</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={values.type}
              label="Tipo"
              onChange={handleChange}
              error={touched.type && Boolean(errors.type)}
            >
              <MenuItem value="deposit">Depósito</MenuItem>
              <MenuItem value="withdrawal">Saque</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
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
            name="description"
            label="Descrição"
            value={values.description}
            onChange={handleChange}
          />
          <Box sx={{ display:'flex', justifyContent:'flex-end', mt:2 }}>
            <Button variant="text" color="error" onClick={onCancel} sx={{ mr:1 }}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  </Box>
);

export default TransactionForm;
