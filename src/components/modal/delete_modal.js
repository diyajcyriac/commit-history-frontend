import React, { useState, useEffect } from "react";
import "./modal.css";
import { FaTrash, FaTimes } from "react-icons/fa";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function DeleteModal(props) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(props.items.id);
  const [project, setProject] = useState(props.items.project);
  const [link, setLink] = useState(props.items.link);
  const [errorMessages, setErrorMessages] = useState({});

  const delete_row = async (id_num) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    console.log(id_num, "id inside delete");
    const response = await fetch(
      "http://localhost:5000/project/delete/?id=" + id_num,
      requestOptions
    );
    console.log(response, "deleted");
    window.location.reload(false);
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
      <i onClick={toggleModal} className="">
        <FaTrash />
      </i>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="delete_message">
            <Typography component="h1" variant="h5" color="black">
              Do you really want to delete?
            </Typography>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                delete_row(props.items.id);
              }}
            >
              Delete
            </Button>

            <i className="close-modal" onClick={toggleModal}>
              <FaTimes />
            </i>
          </div>
        </div>
      )}
    </>
  );
}
