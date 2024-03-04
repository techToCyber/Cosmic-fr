import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    if( email === "helloworld@gmail.com" && password === "hello123@"){
        navigate("/")
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, marginTop: '50px'}}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={onLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                id="email"
                label="Email"
                name="email"
                placeholder="Your email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                id="password"
                label="Password"
                name="password"
                placeholder="Your password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Login
          </Button>
          {error && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ mt: 2 }}
            >
              {error}
            </Typography>
          )}
        </form>
        <Typography variant="body2" align="center">
          No account yet?{" "}
          <Link component={NavLink} to="/signup" underline="always">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
