import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../actions/UserAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {default as avatarPreviewimg}  from "../assets/images/default_avatar.png";
import { Box, Button, TextField, Typography, Avatar, Input, FormControl, InputLabel } from "@mui/material";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(avatarPreviewimg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
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
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
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
          Register
        </Typography>

        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          name="name"
          value={userData.name}
          onChange={onChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={userData.email}
          onChange={onChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={userData.password}
          onChange={onChange}
          margin="normal"
        />

        <Box mt={2} mb={2}>
          <FormControl fullWidth>
            {/* <InputLabel htmlFor="avatar-upload">Avatar</InputLabel> */}
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={avatarPreview}
                alt="Avatar Preview"
                sx={{ width: 50, height: 50 }}
              />
              <Input
                type="file"
                name="avatar"
                inputProps={{ accept: "image/*" }}
                onChange={onChange}
                id="avatar-upload"
              />
            </Box>
          </FormControl>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
        //   disabled={loading}
          sx={{ py: 2, mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
