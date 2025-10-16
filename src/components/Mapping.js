import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { mappingAPI } from '../services/api';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Alert,
  IconButton,
  Chip,
  useTheme,
  Avatar
} from '@mui/material';
import {
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const Mapping = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [ayushTerm, setAyushTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ayushTerm.trim()) {
      setError('Please enter an AYUSH term to map');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setSuccess(false);

    try {
      const response = await mappingAPI.mapAyushTerm({ ayush_term: ayushTerm });
      setResult(response.data);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error('Error mapping AYUSH term:', error);
      setError(error.response?.data?.detail || 'Failed to map AYUSH term. Please try again.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleViewHistory = () => {
    navigate('/dashboard');
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'success';
    if (confidence >= 70) return 'info';
    return 'warning';
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f5f8',
      p: { xs: 2, md: 4 }
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            color="primary" 
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="primary">
              AYUSH Mapping
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Map AYUSH terms to modern medical terminology
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<HistoryIcon />}
          onClick={handleViewHistory}
        >
          View History
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Input Section */}
        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Enter AYUSH Term
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="AYUSH Term"
                  variant="outlined"
                  value={ayushTerm}
                  onChange={(e) => setAyushTerm(e.target.value)}
                  placeholder="e.g., Vata, Pitta, Kapha"
                  sx={{ mb: 3 }}
                />
                
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                  sx={{ py: 1.5, borderRadius: 2 }}
                >
                  {loading ? 'Mapping...' : 'Map Term'}
                </Button>
              </form>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Mapping Guidelines:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <InfoIcon fontSize="small" color="info" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Enter traditional AYUSH terminology
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <InfoIcon fontSize="small" color="info" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Results include ICD codes and modern equivalents
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InfoIcon fontSize="small" color="info" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Confidence score indicates mapping accuracy
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Results Section */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Mapping Results
              </Typography>
              
              {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
                  <CircularProgress size={60} sx={{ mb: 3 }} />
                  <Typography variant="body1">
                    Mapping AYUSH term to modern medical terminology...
                  </Typography>
                  <Box sx={{ width: '100%', mt: 4 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                      Agent Processing Pipeline
                    </Typography>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CircularProgress size={16} sx={{ mr: 2 }} />
                        <Typography variant="body2">Extraction Agent: Analyzing key terms...</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, opacity: 0.5 }}>
                        <CircularProgress size={16} sx={{ mr: 2, visibility: 'hidden' }} />
                        <Typography variant="body2">Classification Agent: Waiting...</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', opacity: 0.5 }}>
                        <CircularProgress size={16} sx={{ mr: 2, visibility: 'hidden' }} />
                        <Typography variant="body2">Mapping Agent: Waiting...</Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              ) : result ? (
                <Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 3
                  }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        AYUSH Term
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {result.ayush_term}
                      </Typography>
                    </Box>
                    <Chip 
                      icon={
                        result.confidence >= 90 ? <CheckCircleIcon /> : 
                        result.confidence >= 70 ? <CheckCircleIcon /> : 
                        <WarningIcon />
                      }
                      label={`${result.confidence}% Confidence`}
                      color={getConfidenceColor(result.confidence)}
                      sx={{ fontWeight: 'medium', px: 1 }}
                    />
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          ICD Code
                        </Typography>
                        <Typography variant="h6">
                          {result.icd_code}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Disease Category
                        </Typography>
                        <Typography variant="h6">
                          {result.disease_category || 'Not specified'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Disease Name
                        </Typography>
                        <Typography variant="h6">
                          {result.disease_name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Description
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {result.description || 'No detailed description available for this mapping.'}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    {/* Agent Processing Steps */}
                    <Grid item xs={12}>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                          Agent Processing Pipeline
                        </Typography>
                        <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
                          {result.processing_steps ? (
                            result.processing_steps.map((step, index) => (
                              <Box key={index} sx={{ mb: index < result.processing_steps.length - 1 ? 2 : 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                  <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1, mt: 0.5 }} />
                                  <Box>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                      {step.agent}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {step.output}
                                    </Typography>
                                  </Box>
                                </Box>
                                {index < result.processing_steps.length - 1 && (
                                  <Box sx={{ height: 20, borderLeft: '1px dashed', borderColor: 'divider', ml: 1.5, my: 0.5 }} />
                                )}
                              </Box>
                            ))
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No processing steps available.
                            </Typography>
                          )}
                        </Paper>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      onClick={() => setAyushTerm('')}
                      sx={{ mr: 2 }}
                    >
                      New Mapping
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleViewHistory}
                    >
                      View History
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  py: 8,
                  textAlign: 'center'
                }}>
                  <Avatar sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: theme.palette.primary.light,
                    mb: 3
                  }}>
                    <SearchIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    No Results Yet
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
                    Enter an AYUSH term in the form and click "Map Term" to see the mapping results here.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Mapping;