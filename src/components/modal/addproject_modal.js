import React, { useState, useEffect } from "react";
import "./modal.css";
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
const defaultTheme = createTheme({
  palette: {
    black: '#000000', 
  },
});



const AddProject = styled("div")(({ theme }) => ({
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

export default function AddModal(props) {
  const [modal, setModal] = useState(false);
  const [project, setProject] = useState("");
  const [link, setLink] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const submit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project: project, link: link }),
    };
    fetch("http://localhost:5000/project/insert/", requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          return await Promise.reject(error);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message, " message");
        setErrorMessages({
          name: "success",
          message: errors.success,
        });
        setTimeout(() => setErrorMessages({}), 3000);
        window.location.reload(false);
      })
      .catch((error) => {
        if (error.error === "Link already exists.") {
          setErrorMessages({
            name: "duplicate_link_value",
            message: errors.duplicate_link_value,
          });
          setTimeout(() => setErrorMessages({}), 3000);
          console.error("Error link:", error.error);
        } else {
          console.error("Error:", error); // Log other errors
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const blank_data = project === "" || link === "";
    if (blank_data) {
      setErrorMessages({ name: "blank_value", message: errors.blank_value });
      setTimeout(() => setErrorMessages({}), 3000);
    } else {
      if (link.slice(0, 19) != "https://github.com/" || link.slice(-4) != ".git") {
        setErrorMessages({
          name: "incorrect_repo",
          message: errors.incorrect_repo,
        });
        setTimeout(() => setErrorMessages({}), 3000);
      } else {
        submit();
      }
    }
  };
  const renderErrorMessage = (name) => {
    return (
      name === errorMessages.name && (
        <div className="error_message">{errorMessages.message}</div>
      )
    );
  };

  const errors = {
    blank_value: "Values must be filled",
    incorrect_repo: "Enter correct repository link",
    success: "Successfully Updated",
    duplicate_link_value: "Github link already exists",
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <AddProject onClick={toggleModal}>
        <AddIconWrapper>
          <FaPlusCircle />
        </AddIconWrapper>
        <StyledInputBase
          type="submit"
          value="Add Project"
          fullWidth
          variant="contained"
        />
      </AddProject>
      {/* <i onClick={toggleModal} className="">
        <FaEdit />
      </i> */}

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Typography component="h1" variant="h5" color="black">
                  Add Projects
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="project"
                    label="Project Name"
                    name="project"
                    autoComplete="project"
                    autoFocus
                    onChange={(e) => {
                      setProject(e.target.value);
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="link"
                    label="Github Link"
                    type="link"
                    id="link"
                    autoComplete="link"
                    onChange={(e) => {
                      setLink(e.target.value);
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
                  {renderErrorMessage("incorrect_repo")}
                  {renderErrorMessage("success")}
                  {renderErrorMessage("duplicate_link_value")}
                </Box>
              </Container>
            </ThemeProvider>
            <i className="close-modal" onClick={toggleModal} color="black">
              <FaTimes />
            </i>
          </div>
        </div>
      )}
    </>
  );
}
