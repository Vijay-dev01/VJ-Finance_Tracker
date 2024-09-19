import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../actions/UserAction";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError());
        },
      });
    }
  }, [error, isAuthenticated, dispatch, navigate, redirect]);

  return (
    <Fragment>
      <MetaData title={`Login`} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            width: { xs: "90%", sm: "50%", md: "35%" },
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h4" component="h1" textAlign="center" mb={3}>
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Link to="/password/forgot" style={{ textDecoration: "none" }}>
              <Typography color="primary">Forgot Password?</Typography>
            </Link>

            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography color="primary">New User?</Typography>
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            // disabled={loading}
            sx={{ py: 2, mt: 3 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
}
