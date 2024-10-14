import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthError } from "../../actions/UserAction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("Password Reset Success!", {
        type: "success",
        // position: toast.POSITION.BOTTOM_CENTER,
        position: "bottom-center", 
      });
      navigate("/homescreen");
      return;
    }
    if (error) {
      toast(error, {
        // position: toast.POSITION.BOTTOM_CENTER,
        position: "bottom-center", 
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          New Password
        </Typography>

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 2, mt: 3 }}
        >
          Set Password
        </Button>
      </Box>
    </Container>
  );
}
