import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack
} from "@mui/material";
import { DeleteOutlined } from "@ant-design/icons";

export default function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogContent sx={{ textAlign: "center", pb: 0 }}>
        <Stack alignItems="center" spacing={2}>
          <DeleteOutlined style={{ fontSize: 48, color: "#f44336", marginBottom: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#637381", whiteSpace: "pre-line" }}>
            {message}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={onCancel} variant="outlined" color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
