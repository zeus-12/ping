import {
  Box,
  IconButton,
  Typography,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  ToolTip,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";

const headCells = ["Name", "Building", "Status", "Actions"];

const EnhancedTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell key={index} align={headCell.numeric ? "right" : "left"}>
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = ({ addCameraAction }) => {
  return (
    <Box
      sx={{
        pl: 2,
        pr: 1,
        mt: 1,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Cameras
      </Typography>
      <Box
        sx={{ display: "flex", justifyDirection: "row", alignItems: "center" }}
      >
        <Select value="All" sx={{ mr: 2 }} width="100px" size="small">
          <option value="All">All</option>
          <option value="Building 1">Building 1</option>
          <option value="Building 2">Building 2</option>
        </Select>
        <Button
          variant="contained"
          onClick={addCameraAction}
          startIcon={<AddIcon />}
        >
          New
        </Button>
      </Box>
    </Box>
  );
};

const CamerasTable = ({
  rows,
  onAddBtnClick,
  onEditBtnClick,
  onDeleteBtnClick,
  selected,
  onSelect,
}) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <EnhancedTableToolbar addCameraAction={onAddBtnClick} />
      <TableContainer>
        <Table size="small">
          <EnhancedTableHead />
          <TableBody>
            {rows.length > 0 &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    onClick={() => onSelect(index + page * rowsPerPage)}
                    role="checkbox"
                    aria-checked={selected === index + page * rowsPerPage}
                    tabIndex={-1}
                    key={index}
                    selected={selected === index + page * rowsPerPage}
                  >
                    <TableCell component="th" id={index} scope="row">
                      {row.camera_name}
                    </TableCell>
                    <TableCell align="left">{row.building_name}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: row.isWorking ? "green" : "red" }}
                    >
                      {row.isWorking ? "WORKING" : "NOT WORKING"}
                    </TableCell>
                    <TableCell align="left">
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        size="small"
                        onClick={() => onEditBtnClick(index)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        size="small"
                        onClick={() => onDeleteBtnClick(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

export default CamerasTable;
