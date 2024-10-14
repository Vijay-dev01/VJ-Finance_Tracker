import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/UserAction";
import { clearUpdateProfile } from "../../slices/AuthSlice";
import  avatarPreviewimg  from "../../assets/images/default_avatar.png";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function UpdateProfile() {
  const { error, user, isUpdated } = useSelector((state) => state.authState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(avatarPreviewimg);
  const dispatch = useDispatch();

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }

    if (isUpdated) {
      toast("Profile updated successfully", {
        type: "success",
        // position: toast.POSITION.BOTTOM_CENTER,
        position: "bottom-center", 
        onOpen: () => dispatch(clearUpdateProfile()),
      });
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
  }, [user, isUpdated, error, dispatch]);

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
        encType="multipart/form-data"
      >
        <Typography variant="h4" gutterBottom>
          Update Profile
        </Typography>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Grid container alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Avatar
              src={avatarPreview}
              sx={{ width: 56, height: 56 }}
              alt="Avatar Preview"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" component="label">
              Choose Avatar
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onChangeAvatar}
              />
            </Button>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 2, mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Container>
  );
}
