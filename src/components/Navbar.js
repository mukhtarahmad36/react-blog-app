import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import { useContext } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const { login } = useContext(GlobalContext);
    

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button variant="h6" component="div" sx={{ flexGrow: 1 }}  onClick={() => navigate(`/`)}>
            posts
          </Button>
          <Button color="inherit" onClick={() => navigate(`/sign_up`) }>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}