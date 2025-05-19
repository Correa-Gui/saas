import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function ModalForm({ open, onClose, onSubmit, title, children, submitting }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>Cancelar</Button>
        <Button onClick={onSubmit} disabled={submitting} variant="contained">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
