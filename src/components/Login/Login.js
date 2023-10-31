import React, { useState, useEffect } from "react";
import "./Login.css";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login({ setIsLoggedIn }) {
  const [errorMessages, setErrorMessages] = useState({});
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };
    fetch("http://localhost:5000/login", requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          return await Promise.reject(error);
        }
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setIsLoggedIn(data.token);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setErrorMessages({
          name: "success",
          message: errors.success,
        });
        setTimeout(() => setErrorMessages({}), 3000);
        window.location.reload(false);
      })
      .catch((error) => {
        if (error.error === "Invalid Credentials") {
          setErrorMessages({
            name: "incorrect_value",
            message: errors.incorrect_value,
          });
          setTimeout(() => setErrorMessages({}), 3000);
        
        
          console.error("Error link:", error.error);
        } 
        else if (error.error === "All input is required") {
          setErrorMessages({
            name: "blank_value",
            message: errors.blank_value,
          });
          setTimeout(() => setErrorMessages({}), 3000);
        
        
          // console.error("Error link:", error.error);
        } else {
          setErrorMessages({
            name: "try_again",
            message: errors.try_again,
          });
          setTimeout(() => setErrorMessages({}), 3000);

          console.error("Error:", error); // Log other errors
        }
      });
  };
  // const loginUser = async (credentials) => {
  //   try {
  //     const response = await fetch("http://localhost:5000/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(credentials),
  //     });
  //     setErrorMessages({
  //       name: "success",
  //       message: errors.success,
  //     });
  //     setTimeout(() => setErrorMessages({}), 3000);
  //     const data = await response.json();
  //     localStorage.setItem("token", data.token);
  //     setIsLoggedIn(data.token);

  //     return true;
  //   } catch (error) {
  //     console.log(error.error);
  //     if (error.error === "Invalid Credentials") {
  //       // setErrorMessages({
  //       //   name: "blank_value",
  //       //   message: errors.blank_value,
  //       // });
  //       // setTimeout(() => setErrorMessages({}), 3000);
  //       alert("wrong credentials")
  //     }

  //     return false;
  //   }
  // };

  const renderErrorMessage = (name) => {
    return (
      name === errorMessages.name && (
        <div className="error_message">{errorMessages.message}</div>
      )
    );
  };
  const errors = {
    blank_value: "Values must be filled",
    incorrect_value: "Wrong username/password",
    try_again: "Problem with login.Please try again Later",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submit();
  };

  return (
    <div className="login-wrapper">
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Typography component="h1" variant="h5" color="black">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          {renderErrorMessage("blank_value")}
          {renderErrorMessage("incorrect_value")}
          {renderErrorMessage("success")}
        </Box>
      </Container>
    </div>
  );
}
