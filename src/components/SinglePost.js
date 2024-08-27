import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateComment from "../models/CreateComment";
import Swal from "sweetalert2";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get(`${baseUrl}/${id}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${baseUrl}/${id}/comments`).then((response) => {
      let comments = response.data.filter((comment) => {
        return comment.postId === post.id;
      });
      setComments(comments);
    });
  }, [post]);

  const fetchComments = () => {
    axios.get(`${baseUrl}/${id}/comments`).then((response) => {
      let comments = response.data.filter((comment) => {
        return comment.postId === post.id;
      });
      setComments(comments);
    });
  };

  function deleteItem(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/comments/${id}`)
          .then((resp) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchComments();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  return (
    <>
      <Card key={post.id} sx={{ maxWidth: 545, ml: 10, mt: 2 }}>
        <h2> Post: </h2>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <br></br>
        <CreateComment callBack={fetchComments()} />

        <h3>Comments:</h3>
        {comments.map(function (comment) {
          return (
            <Card key={comment.id} sx={{ maxWidth: 545, mt: 3 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h12" component="div">
                    {comment.body}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button
                    variant="outlined"
                    color="error"
                    right="50%"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteItem(comment.id)}>

              </Button>
            </Card>
          );
        })}
      </Card>
    </>
  );
}
