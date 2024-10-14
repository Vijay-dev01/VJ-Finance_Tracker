import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../actions/UserAction";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../utils/MetaData";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";

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
        // position: toast.POSITION.BOTTOM_CENTER,
        position: "bottom-center", 
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
      <Grid container justifyContent="center" style={{ marginTop: "50px" }}>
        <Grid item xs={12} md={6}>
          <form onSubmit={submitHandler}>
            <Box p={4} boxShadow={3} borderRadius={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                Login
              </Typography>

              <Box mb={3}>
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Box>

              <Box mb={3}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Link to="/password/forgot" style={{ textDecoration: 'none' }}>
                  Forgot Password?
                </Link>
              </Box>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                // disabled={loading}
              >
                LOGIN
              </Button>

              <Box display="flex" justifyContent="center" mt={3}>
                <Typography variant="body2">
                  New User?{" "}
                  <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Register Here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
}
