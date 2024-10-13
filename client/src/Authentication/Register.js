import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../actions/UserAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import  avatarPreviewimg  from "../assets/images/default_avatar.png";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  Grid,
  InputLabel,
} from "@mui/material";

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
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <Grid container justifyContent="center" style={{ marginTop: "50px" }}>
      <Grid item xs={12} md={6}>
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <Box p={4} boxShadow={3} borderRadius={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Register
            </Typography>

            <Box mb={3}>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                value={userData.name}
                onChange={onChange}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                fullWidth
                value={userData.email}
                onChange={onChange}
              />
            </Box>

            <Box mb={3}>
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                fullWidth
                value={userData.password}
                onChange={onChange}
              />
            </Box>

            <Box mb={3}>
              <InputLabel htmlFor="avatar_upload">Avatar</InputLabel>
              <Box display="flex" alignItems="center">
                <Avatar
                  src={avatarPreview}
                  alt="Avatar Preview"
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <input
                  type="file"
                  name="avatar"
                  onChange={onChange}
                  id="avatar_upload"
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <Button variant="contained" component="label">
                  Choose Avatar
                  <input type="file" hidden name="avatar" onChange={onChange} />
                </Button>
              </Box>
            </Box>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              size="large"
            //   disabled={loading}
            >
              REGISTER
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
}
