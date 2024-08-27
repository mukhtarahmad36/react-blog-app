import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Grid } from "@mui/material";
import { baseUrl } from "../App";
import axios from "axios";
import { Link } from "@mui/material";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import CreatePost from "../models/CreatePost";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { Box } from "@mui/system";

export const Post = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setPosts(response.data);
    });
  }, []);

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
          .delete(`${baseUrl}/${id}`)
          .then((resp) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  const fetchData = () => {
    axios.get(baseUrl).then((response) => {
      console.log(response.data)
      setPosts(response.data);
    });
  };

  return (
    <>
      <CreatePost callBack={fetchData} />
      <Box sx={{ flexGrow: 1, ml: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {posts.map(function (post, i) {
            return (
              <Grid item xs={2} sm={4} md={4} key={i}>
                <Box key={i}>
                  <Card
                    key={post.id}
                    sx={{ maxWidth: 345 }}
                    onClick={() => navigate(`post/${post.id}`)}
                  >
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
                  </Card>
                  <Button
                    variant="outlined"
                    color="error"
                    right="50%"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteItem(post.id)}
                  ></Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};
