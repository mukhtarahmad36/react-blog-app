import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { baseUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { margin } from "@mui/system";

export default function CreatePost({ callBack }) {
  const axios = require("axios");

  const navigate = useNavigate();

  const [title, setTitle] = React.useState([]);
  const [body, setBody] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, setUser] = React.useState("");
  const allUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleChange = (event) => {
    setUser(event.target.value);
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

  const createPost = (e) => {
    debugger
    axios
      .post(`${baseUrl}/`, { userId: user, title: title, body: body })
      .then((resp) => {
        console.log(resp.data);
        handleClose();
        callBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <> 
      <div style={{ textAlign: "right", margin: "1%", paddingRight: 102 }}>
        <Button variant="contained" color="success" onClick={handleOpen}>
          Create Post
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Post
          </Typography>
          <TextField
            fullWidth
            label="Title"
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
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user}
              label="Age"
              onChange={handleChange}
            >
              {allUsers.map((userId) => {
                return (
                  <MenuItem key={userId} value={userId}>
                    {userId}
                  </MenuItem>
                );
              })}
            </Select>
            <br></br>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={() => createPost()}
            >
              Create
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
