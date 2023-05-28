<<<<<<< HEAD
import { 
  Button, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Grid, 
  Box, 
  Typography, 
  Container,
  Snackbar
=======
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Snackbar,
>>>>>>> main
} from "@mui/material";

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import useUser from "@/lib/useUser";

export default function Login() {
  const { signedIn, userInfo } = useUser(true);
  const router = useRouter(true);

  let [message, setMessage] = useState("");

  if (signedIn) {
    router.push("/dashboard");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get("email");
    let password = data.get("password");

    if (!email) setMessage("Missing Email");
    if (!password) setMessage("Missing Password");

<<<<<<< HEAD
    axios.post("api/login", { email, password })
=======
    axios
      .post("api/login", { email, password })
>>>>>>> main
      .then((res) => {
        let body = res.data;

        if (!body.success) {
          // ERROR (do some snackbar thing)
          setMessage(body.message);

          return;
        }

        router.push("/dashboard");
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={message.length > 0}
        autoHideDuration={6000}
        onClose={() => {
          setMessage("");
        }}
        message={message}
      />
    </Container>
  );
}
