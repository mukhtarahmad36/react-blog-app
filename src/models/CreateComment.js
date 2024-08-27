import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { baseUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { margin } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateComment(callBack) {
  const axios = require("axios");

  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = React.useState([]);
  const [body, setBody] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [post, setPost] = React.useState("");

  const createComment = (e) => {
    axios
      .post(`http://localhost:3000/comments`, {
        postId: parseInt(id),
        name: title,
        body: body,
      })
      .then((resp) => {
        console.log(resp.data);
        handleClose();
        callBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="success">
        Create Comment
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Comment
          </Typography>
          <TextField
            fullWidth
            label="name"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <br />
          <br />
          <FormControl fullWidth>
            <br></br>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={() => createComment()}
            >
              Create
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
