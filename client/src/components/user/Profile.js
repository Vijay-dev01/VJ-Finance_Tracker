import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Box, Grid, Avatar, Typography, Button } from "@mui/material";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);

  return (
    <Container>
      <Grid container justifyContent="center" spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={user.avatar ?? "../../assets/images/default_avatar.png"}
              alt="Profile Avatar"
              sx={{ width: 150, height: 150 }}
            />
            <Button
              component={Link}
              to="/myprofile/update"
              variant="contained"
              color="primary"
              sx={{ my: 3, width: '100%' }}
            >
              Edit Profile
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Full Name
          </Typography>
          <Typography variant="body1" gutterBottom>
            {user.name}
          </Typography>

          <Typography variant="h4" gutterBottom>
            Email Address
          </Typography>
          <Typography variant="body1" gutterBottom>
            {user.email}
          </Typography>

          <Typography variant="h4" gutterBottom>
            Joined
          </Typography>
          <Typography variant="body1" gutterBottom>
            {String(user.createdAt).substring(0, 10)}
          </Typography>

          <Button
            component={Link}
            to="/orders"
            variant="contained"
            color="error"
            sx={{ mt: 3, width: '100%' }}
          >
            My Orders
          </Button>

          <Button
            component={Link}
            to="/myprofile/update/password"
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: '100%' }}
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
