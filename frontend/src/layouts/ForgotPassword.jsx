import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearAuthError } from "../actions/UserAction";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast(message, {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setEmail("");
      return;
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError());
        },
      });
      return;
    }
  }, [message, error, dispatch]);

  return (
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
          Forgot Password
        </Typography>

        <TextField
          fullWidth
          label="Enter Email"
          variant="outlined"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ py: 2, mt: 3 }}
        >
          Send Email
        </Button>
      </Box>
    </Box>
  );
}
