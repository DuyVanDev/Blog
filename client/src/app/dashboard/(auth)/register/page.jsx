"use client";
import axios from "axios";
import React, { useContext,useState } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5167/api/Auth/Register", {
        username,
        password,
      });
      if (res.status == 200) {
        setMessage("Đăng ký thành công");

      }
    } catch (err) {
      setMessage("Đã có lỗi")
      throw new Error(err);
    }
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Đăng Ký
          </Typography>
          <Box component="form" onSubmit={handleClick}  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="Username"
              autoFocus
              value={username}
              onChange={e => (setUsername(e.target.value))}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password} onChange={e => (setPassword(e.target.value))}
            />
            {message && <div>{message}</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng Ký
            </Button>
            <Grid container>
              
              <Grid item>
                <Link href="/dashboard/login">
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "underline", color: "blue" }}
                  >
                    {"Đã có tài khoản"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
    //   <div>
    //   <form className='form' action="">
    //     <input type="text" placeholder="Username" value={username} required onChange={e => (setUsername(e.target.value))}/>
    //     <input type="text" placeholder="Email" value={email} required  onChange={e => (setEmail(e.target.value))}/>
    //     <input type="password" placeholder="Password" required value={password} onChange={e => (setPassword(e.target.value))}/>
    //     <button onClick={handleClick}>Dang ky</button>
    //     {message && <div>{message}</div>}
    //   </form>
    // </div>
  );
};

export default Register;
