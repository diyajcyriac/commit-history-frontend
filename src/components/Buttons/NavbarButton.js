import React, { useState, useEffect } from "react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme({
  palette: {
    black: "#000000",
  },
});

const Logout_button = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const AddIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 3),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
}));

export default function Logout({setIsLoggedIn}) {
  

  const handleLogoutSubmit = () => {
    localStorage.clear();
    window.location.reload(false);
    setIsLoggedIn(false);
  };

  return (
    <>
      <Logout_button onClick={handleLogoutSubmit}>
        <AddIconWrapper>
          <FaSignOutAlt />
        </AddIconWrapper>
        <StyledInputBase
          type="submit"
          value="Logout"
          fullWidth
          variant="contained"
        />
      </Logout_button>
    </>
  );
}
