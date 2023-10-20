import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { React, useState } from "react";
import "./table.css";
import { Link } from "react-router-dom";
import Modal from "../modal/update_modal";
import DeleteModal from "../modal/delete_modal";
import IconButton from "@mui/material/IconButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DataTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Project Name</StyledTableCell>
            <StyledTableCell>Github Link</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <Link
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    cursor: "pointer",
                  }}
                  to={`/history/${row?.id}`}
                >
                  <div>{row?.project}</div>
                </Link>
              </StyledTableCell>
              <StyledTableCell>{row.link}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  size="medium"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <Modal items={row} />
                </IconButton>
                <IconButton
                  size="medium"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <DeleteModal items={row} />
                </IconButton>
                
                
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
