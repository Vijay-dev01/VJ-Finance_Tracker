import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Adjust for responsiveness

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/LogIn">
          <ListItemText primary="LogIn" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Title or Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyWebsite
        </Typography>

        {isMobile ? (
          // Mobile view: Display Menu Icon and Drawer
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          // Desktop view: Display buttons
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            <Button color="inherit" component={Link} to="/login">
              LogIn
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              Contact
            </Button>
          </>
        )}

        {/* Drawer for mobile view */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
