import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { FaList } from "react-icons/fa";
import AddModal from "../modal/addproject_modal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Logout from "../Buttons/NavbarButton";
// import { useAuth } from "../../AuthContext";
import { useAuth } from "../../hooks/useAuth";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Navbar = () => {
  const {IS_LOGGEDIN} = useAuth();
  const isLoggedIn = true ;
  return (
    <Box sx={{ flexGrow: 1 }}>
      {JSON.stringify(auth)}
      <AppBar position="static">
        <Toolbar>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
            to="/"
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <FaList />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
              }}
              to="/"
            >
              Project Log
            </Link>
          </Typography>
          {IS_LOGGEDIN && <Logout/>}
          {IS_LOGGEDIN && <AddModal />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
