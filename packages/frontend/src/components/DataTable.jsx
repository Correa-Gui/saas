import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  IconButton,
  TablePagination,
  Paper,
  Collapse,
  Stack,
} from "@mui/material";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function DataTable({
  title,
  filters = [],
  onFilterChange,
  filterValues = {},
  columns = [],
  data = [],
  onView,
  onEdit,
  onDelete,
  onAdd,
  pagination = { page: 0, rowsPerPage: 10, total: 0 },
  onPageChange,
  onRowsPerPageChange,
  rowDetailsRender,
  expandedRow,
  onToggleExpandRow,
}) {
  const [selected, setSelected] = React.useState([]);

  const handleSelect = (id) => {
    if (selected.includes(id)) setSelected(selected.filter((x) => x !== id));
    else setSelected([...selected, id]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelected(data.map((row) => row.id || row.CODIGO_FORNECEDOR));
    else setSelected([]);
  };

  return (
    <Box>
      {/* Cabeçalho */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#212B36" }}>
          {title}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {filters.map(({ label, name, type, options }) => {
            if (type === "text")
              return (
                <TextField
                  key={name}
                  size="small"
                  label={label}
                  value={filterValues[name] || ""}
                  onChange={(e) =>
                    onFilterChange && onFilterChange(name, e.target.value)
                  }
                />
              );
            if (type === "select")
              return (
                <Select
                  key={name}
                  size="small"
                  value={filterValues[name] || ""}
                  onChange={(e) =>
                    onFilterChange && onFilterChange(name, e.target.value)
                  }
                  displayEmpty
                  sx={{ minWidth: 140 }}
                >
                  <MenuItem value="">{label}</MenuItem>
                  {options?.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              );
            return null;
          })}
          {onAdd && (
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={onAdd}
              sx={{ whiteSpace: "nowrap" }}
            >
              Novo {title}
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Tabela */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table size="medium" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "transparent" }}>
              <TableCell padding="checkbox" sx={{ borderBottom: "1px solid #ddd" }}>
                <Checkbox
                  checked={data.length > 0 && selected.length === data.length}
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  onChange={handleSelectAll}
                  sx={{ color: "#637381" }}
                />
              </TableCell>
              {columns.map(({ title, field, width }) => (
                <TableCell
                  key={field}
                  sx={{
                    fontWeight: "bold",
                    fontSize: 14,
                    width: width || "auto",
                    color: "#212B36",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  {title.toUpperCase()}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#212B36",
                  borderBottom: "1px solid #ddd",
                  whiteSpace: "nowrap",
                }}
              >
                AÇÕES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const rowId = row.id || row.CODIGO_FORNECEDOR;
              return (
                <React.Fragment key={rowId}>
                  <TableRow hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(rowId)}
                        onChange={() => handleSelect(rowId)}
                        sx={{ color: "#637381" }}
                      />
                    </TableCell>
                    {columns.map(({ field, render }) => (
                      <TableCell key={field}>
                        {render ? render(row[field], row) : row[field]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          sx={{ color: expandedRow === rowId ? "red" : "gray" }}
                          onClick={() => {
                            onToggleExpandRow(rowId);
                            onView && onView(row);
                          }}
                        >
                          {expandedRow === rowId ? <CloseOutlined /> : <EyeOutlined sx={{ color: "gray" }} />}
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onEdit && onEdit(row)}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete && onDelete(row)}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>

                  {/* Linha detalhes expandida */}
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={columns.length + 2}
                    >
                      <Collapse in={expandedRow === rowId} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                          {rowDetailsRender ? rowDetailsRender(row) : "Sem detalhes"}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginação */}
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={(e, newPage) => onPageChange && onPageChange(newPage)}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange && onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        labelRowsPerPage="Linha por página:"
      />
    </Box>
  );
}
