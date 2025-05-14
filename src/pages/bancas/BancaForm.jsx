// src/pages/bancas/BancaForm.jsx
import { Snackbar, Alert } from '@mui/material';

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const bookmakerOptions = [
  { value: 'bet365',   label: 'Bet365' },
  { value: 'pinnacle', label: 'Pinnacle' },
  { value: 'betano',   label: 'Betano' }
];

const validationSchema = Yup.object({
  bookmaker:    Yup.string().required('Obrigatório'),
  name:         Yup.string().required('Obrigatório'),
  initialValue: Yup.number()
    .typeError('Deve ser numérico')
    .required('Obrigatório')
});

const BancaForm = ({
  initialValues = { bookmaker: '', name: '', initialValue: '' },
  onSubmit,
  onCancel
}) => (
  <Box sx={{ p: 3, minWidth: 400 }}>
    <Typography variant="h6" gutterBottom>
      {initialValues.id ? 'Editar Banca' : 'Nova Banca'}
    </Typography>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <FormControl
            fullWidth
            margin="normal"
            error={touched.bookmaker && Boolean(errors.bookmaker)}
          >
            <InputLabel id="bookmaker-label">Casa de Aposta</InputLabel>
            <Select
              labelId="bookmaker-label"
              id="bookmaker"
              name="bookmaker"
              value={values.bookmaker}
              label="Casa de Aposta"
              onChange={handleChange}
            >
              {bookmakerOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {touched.bookmaker && (
              <Typography color="error" variant="caption">
                {errors.bookmaker}
              </Typography>
            )}
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            id="name"
            name="name"
            label="Nome da Banca"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            margin="normal"
            id="initialValue"
            name="initialValue"
            label="Valor Inicial"
            type="number"
            value={values.initialValue}
            onChange={handleChange}
            error={touched.initialValue && Boolean(errors.initialValue)}
            helperText={touched.initialValue && errors.initialValue}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="text"
              color="error"
              onClick={onCancel}
              sx={{ mr: 1 }}
            >
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

export default BancaForm;
