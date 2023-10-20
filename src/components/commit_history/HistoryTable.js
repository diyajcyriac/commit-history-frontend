import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { React, useEffect, useState } from "react";
import "./history.css";
import moment from "moment";

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

export default function HistoryTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Branch Name</StyledTableCell>
            {/* <StyledTableCell>Github Link</StyledTableCell> */}
            <StyledTableCell>Commit Date</StyledTableCell>
            <StyledTableCell>Commit ID</StyledTableCell>
            <StyledTableCell align="center">
              Number of Additions
            </StyledTableCell>
            <StyledTableCell align="center">
              Number of Deletions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((projects) => (
            <StyledTableRow key={projects?.id}>
              <StyledTableCell component="th" scope="row">
                {projects?.user_name}
              </StyledTableCell>
              <StyledTableCell>{projects?.branch_name}</StyledTableCell>
              <StyledTableCell>
                {projects?.commit_date &&
                  moment(projects.commit_date).format("DD-MM-YYYY")}
              </StyledTableCell>
              <StyledTableCell>{projects?.commit_id}</StyledTableCell>
              <StyledTableCell align="center">
                {projects?.num_additions}
              </StyledTableCell>
              <StyledTableCell align="center">
                {projects?.num_deletions}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
