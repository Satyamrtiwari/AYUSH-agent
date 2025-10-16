import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Paper
} from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import TranslateIcon from '@mui/icons-material/Translate';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const LandingPage = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
      color: 'white'
    }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            pt: 12, 
            pb: 6,
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            AYUSH Agent
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              opacity: 0.9
            }}
          >
            Bridging traditional AYUSH medical knowledge with modern healthcare systems through intelligent mapping to ICD-11 codes
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button 
                component={Link} 
                to="/register" 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: '#ff9100',
                  '&:hover': {
                    bgcolor: '#ff6d00',
                  },
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold'
                }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item>
              <Button 
                component={Link} 
                to="/login" 
                variant="outlined" 
                size="large"
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: '#ff9100',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  },
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold'
                }}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            fontWeight: 600
          }}
        >
          Key Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={6}
              sx={{ 
                height: '100%',
                borderRadius: 4,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Card sx={{ height: '100%', bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 4 }}>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <TranslateIcon sx={{ fontSize: 60, color: '#9c27b0', mb: 2 }} />
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="h3" sx={{ mb: 2, color: '#673ab7', fontWeight: 600 }}>
                    Intelligent Mapping
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Advanced AI algorithms that accurately map AYUSH terms to their ICD-11 equivalents with high precision
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={6}
              sx={{ 
                height: '100%',
                borderRadius: 4,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Card sx={{ height: '100%', bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 4 }}>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <MedicationIcon sx={{ fontSize: 60, color: '#9c27b0', mb: 2 }} />
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="h3" sx={{ mb: 2, color: '#673ab7', fontWeight: 600 }}>
                    AYUSH Knowledge Base
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Comprehensive database of Ayurveda, Yoga, Unani, Siddha, and Homeopathy terms and concepts
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={6}
              sx={{ 
                height: '100%',
                borderRadius: 4,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Card sx={{ height: '100%', bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 4 }}>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <HealthAndSafetyIcon sx={{ fontSize: 60, color: '#9c27b0', mb: 2 }} />
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="h3" sx={{ mb: 2, color: '#673ab7', fontWeight: 600 }}>
                    Healthcare Integration
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Seamlessly integrate traditional medicine concepts with modern healthcare systems and electronic health records
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: 'rgba(0,0,0,0.2)',
          mt: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} AYUSH Agent | Bridging Traditional Medicine with Modern Healthcare
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;