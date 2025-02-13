import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Chip,
  Card,
  CardContent,
  Link,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  MenuBook as MenuBookIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon
} from '@mui/icons-material';

const About = () => {
  const socialLinks = [
    {
      icon: <GitHubIcon />,
      url: "https://github.com/yourusername",
      label: "GitHub",
      username: "@devjohn"
    },
    {
      icon: <LinkedInIcon />,
      url: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
      username: "johndoe"
    },
    {
      icon: <InstagramIcon />,
      url: "https://instagram.com/yourusername",
      label: "Instagram",
      username: "@john.codes"
    },
    {
      icon: <MenuBookIcon />,
      url: "https://medium.com/@yourusername",
      label: "Medium",
      username: "@johnwrites"
    }
  ];

  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Companies Worked", value: "8+" },
    { label: "Open Source", value: "20+" }
  ];

  const skills = [
    { category: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "Material UI"] },
    { category: "Backend", items: ["Node.js", "Express.js", "MongoDB", "GraphQL", "REST API", "JWT"] },
    { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Git", "Linux", "Nginx"] }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #E3F2FD, #E8EAF6)',
      py: 6 
    }}>
      <Container maxWidth="lg">
        <Paper sx={{ 
          overflow: 'hidden',
          borderRadius: 4,
          boxShadow: 3
        }}>
          {/* Hero Section */}
          <Box sx={{
            height: '200px',
            background: 'linear-gradient(to right, #1976D2, #3F51B5)',
            position: 'relative'
          }}>
            <Avatar
              src="/api/placeholder/160/160"
              sx={{
                width: 160,
                height: 160,
                border: '4px solid white',
                boxShadow: 3,
                position: 'absolute',
                bottom: -80,
                left: 32,
              }}
            />
          </Box>

          {/* Main Content */}
          <Box sx={{ pt: 12, px: 4, pb: 4 }}>
            {/* Header Info */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
                  John Doe
                </Typography>
                <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                  Senior MERN Stack Developer
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationIcon fontSize="small" />
                    <Typography>San Francisco, CA</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <EmailIcon fontSize="small" />
                    <Typography>john@example.com</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarIcon fontSize="small" />
                    <Typography>Available for freelance</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', mt: { xs: 2, md: 0 } }}>
                {socialLinks.map((link) => (
                  <IconButton
                    key={link.label}
                    component={Link}
                    href={link.url}
                    target="_blank"
                    sx={{ 
                      mx: 1,
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        '& .MuiSvgIcon-root': {
                          color: 'primary.main'
                        }
                      }
                    }}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Grid>
            </Grid>

            {/* Stats Grid */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {stats.map((stat) => (
                <Grid item xs={6} md={3} key={stat.label}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* About Me */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TerminalIcon color="primary" />
                About Me
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Passionate MERN Stack developer with a proven track record of building scalable web applications
                and microservices. I specialize in creating robust solutions that combine powerful backend
                systems with elegant frontend interfaces.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                With expertise in modern JavaScript frameworks and cloud technologies, I focus on delivering
                high-performance applications that provide exceptional user experiences. I'm particularly
                interested in real-time applications, microservices architecture, and progressive web apps.
              </Typography>
            </Box>

            {/* Skills */}
            <Box>
              <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CodeIcon color="primary" />
                Technical Skills
              </Typography>
              <Grid container spacing={3}>
                {skills.map((skillSet) => (
                  <Grid item xs={12} md={4} key={skillSet.category}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          {skillSet.category}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {skillSet.items.map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              variant="outlined"
                              color="primary"
                              sx={{ '&:hover': { backgroundColor: 'primary.light' } }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;