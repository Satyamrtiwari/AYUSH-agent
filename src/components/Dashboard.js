import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mappingAPI } from '../services/api';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  Chip,
  Avatar,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchMappingHistory = async () => {
      try {
        setLoading(true);
        const response = await mappingAPI.getMappingHistory();
        setMappings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mapping history:', error);
        setLoading(false);
      }
    };

    fetchMappingHistory();
  }, []);

  const handleNewMapping = () => {
    navigate('/mapping');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate statistics
  const totalMappings = mappings.length;
  const highConfidenceMappings = mappings.filter(m => m.confidence >= 90).length;
  const averageConfidence = mappings.length > 0 
    ? mappings.reduce((sum, m) => sum + m.confidence, 0) / mappings.length 
    : 0;

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f8'
    }}>
      {/* Sidebar */}
      <Box sx={{ 
        width: 240, 
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        p: 2,
        display: { xs: 'none', md: 'block' }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.main, mr: 2 }}>A</Avatar>
          <Typography variant="h6" fontWeight="bold">AYUSH Agent</Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, mb: 2 }}>MAIN MENU</Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 1.5, 
            borderRadius: 1,
            backgroundColor: 'rgba(255,255,255,0.15)',
            mb: 1
          }}>
            <DashboardIcon sx={{ mr: 2 }} />
            <Typography>Dashboard</Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 1.5, 
            borderRadius: 1,
            mb: 1,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
            cursor: 'pointer'
          }} onClick={handleNewMapping}>
            <SearchIcon sx={{ mr: 2 }} />
            <Typography>New Mapping</Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 1.5, 
            borderRadius: 1,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
            cursor: 'pointer'
          }}>
            <HistoryIcon sx={{ mr: 2 }} />
            <Typography>History</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', my: 2 }} />
        
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 1.5, 
            borderRadius: 1,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
            cursor: 'pointer',
            mt: 2
          }} onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 2 }} />
            <Typography>Logout</Typography>
          </Box>
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="primary">Dashboard</Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back, {user?.username || user?.email?.split('@')[0] || 'User'}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleNewMapping}
              startIcon={<AddIcon />}
              sx={{ mr: 1 }}
            >
              New Mapping
            </Button>
            <IconButton color="primary" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">Total Mappings</Typography>
                  <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                    <SearchIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" fontWeight="bold">{totalMappings}</Typography>
                <Typography variant="body2" color="text.secondary">
                  All-time mapping requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">High Confidence</Typography>
                  <Avatar sx={{ bgcolor: 'success.light' }}>
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" fontWeight="bold">{highConfidenceMappings}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Mappings with 90%+ confidence
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">Avg. Confidence</Typography>
                  <Avatar sx={{ bgcolor: 'info.light' }}>
                    <TrendingUpIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" fontWeight="bold">{averageConfidence.toFixed(1)}%</Typography>
                <Typography variant="body2" color="text.secondary">
                  Average mapping confidence
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* User Profile Card */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      bgcolor: theme.palette.secondary.main,
                      fontSize: '1.5rem',
                      mr: 2
                    }}
                  >
                    {user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {user?.username || user?.email?.split('@')[0] || 'User'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Organization:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {user?.organization || 'Not specified'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Role:
                  </Typography>
                  <Chip 
                    size="small" 
                    label="Researcher" 
                    sx={{ 
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      fontWeight: 'medium'
                    }} 
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card elevation={0} sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">Quick Actions</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      size="large"
                      startIcon={<AddIcon />}
                      onClick={handleNewMapping}
                      sx={{ py: 1.5, borderRadius: 2 }}
                    >
                      New Mapping
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      fullWidth 
                      size="large"
                      startIcon={<HistoryIcon />}
                      sx={{ py: 1.5, borderRadius: 2 }}
                    >
                      View History
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Mappings */}
        <Card elevation={0} sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Recent Mappings
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : mappings.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>AYUSH Term</TableCell>
                      <TableCell>ICD Code</TableCell>
                      <TableCell>Disease Name</TableCell>
                      <TableCell>Confidence</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mappings.map((mapping) => (
                      <TableRow key={mapping.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {mapping.ayush_term}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size="small" 
                            label={mapping.icd_code} 
                            sx={{ 
                              bgcolor: theme.palette.info.light,
                              color: theme.palette.info.contrastText,
                              fontWeight: 'medium'
                            }} 
                          />
                        </TableCell>
                        <TableCell>{mapping.disease_name}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {mapping.confidence >= 90 ? (
                              <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                            ) : mapping.confidence >= 70 ? (
                              <CheckCircleIcon fontSize="small" color="info" sx={{ mr: 1 }} />
                            ) : (
                              <WarningIcon fontSize="small" color="warning" sx={{ mr: 1 }} />
                            )}
                            {mapping.confidence}%
                          </Box>
                        </TableCell>
                        <TableCell>
                          {new Date(mapping.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No mapping history found. Start by creating a new mapping.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleNewMapping}
                  startIcon={<AddIcon />}
                  sx={{ mt: 2 }}
                >
                  Create Mapping
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;