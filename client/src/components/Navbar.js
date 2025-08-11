import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import expenseImage from "../assets/images/expense-img.webp";
import About from "./About";
import Login from "../Authentication/LogIn";
import { Contact } from "lucide-react";


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Track current page
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to handle navigation
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setDrawerOpen(false); // Close drawer after selection on mobile
  };

  // Component to render based on currentPage
  const renderComponent = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'login':
        return <Login />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <Box
            sx={{
              padding: 1,
              backgroundImage: `url(${expenseImage})`,
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
              height: "91vh"
            }}
          >
            <Typography variant="h5">Vijay</Typography>
          </Box>
        );
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem button onClick={() => handleNavigation('home')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('about')}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('login')}>
          <ListItemText primary="LogIn" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('contact')}>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyWebsite
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('home')}
                sx={{ 
                  backgroundColor: currentPage === 'home' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('about')}
                sx={{ 
                  backgroundColor: currentPage === 'about' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                About
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('login')}
                sx={{ 
                  backgroundColor: currentPage === 'login' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                LogIn
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('contact')}
                sx={{ 
                  backgroundColor: currentPage === 'contact' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                Contact
              </Button>
            </>
          )}

          <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            {drawer}
          </Drawer>
        </Toolbar>
      </AppBar>

      {/* Render the current component */}
      {renderComponent()}
    </>
  );
};

export default Navbar;