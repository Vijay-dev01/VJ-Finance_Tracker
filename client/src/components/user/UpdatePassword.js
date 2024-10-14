import { useEffect, useState } from "react";
import {
  updatePassword as updatePasswordAction,
  clearAuthError,
} from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", password);
    dispatch(updatePasswordAction(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast("Password updated successfully", {
        type: "success",
        // position: toast.POSITION.BOTTOM_CENTER,
        position: "bottom-center", 
      });
      setOldPassword("");
      setPassword("");
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
  }, [isUpdated, error, dispatch]);

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
          Update Password
        </Typography>

        <TextField
          label="Old Password"
          type="password"
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 2, mt: 3 }}
        >
          Update Password
        </Button>
      </Box>
    </Container>
  );
}
