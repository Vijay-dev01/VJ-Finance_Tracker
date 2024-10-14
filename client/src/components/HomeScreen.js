import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/UserAction';
import { useNavigate } from 'react-router-dom';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <AccountBoxIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname, user }) {
  // Fallback to default avatar if user.avatar is not present
  const avatarSrc = user.avatar ? user.avatar : '/images/default_avatar.png'; 

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Display User Information */}
      <Box sx={{ mb: 4 }}>
        <img src={avatarSrc} alt="User Avatar" style={{ borderRadius: '50%', width: 100, height: 100 }} />
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1">{user.email}</Typography>
      </Box>

      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

function HomeScreen(props) {
  const { window } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access user data from Redux store
  const { user } = useSelector((state) => state.authState);

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  const handleSignOut = () => {
    dispatch(logout);
     navigate("/");
  };

  return (
    <AppProvider
      session={{
        user: {
          name: user.name,
          email: user.email,
          image: user.avatar,
        },
      }}
      authentication={{
        signIn: () => {
          // Handle sign in logic
        },
        signOut: handleSignOut,
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} user={user} />
      </DashboardLayout>
    </AppProvider>
  );
}

HomeScreen.propTypes = {
  window: PropTypes.func,
};

export default HomeScreen;
