import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mappingAPI } from '../services/api';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid
} from '@mui/material';

const MappingForm = () => {
  const { /* user */ } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ayushTerm, setAyushTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await mappingAPI.mapAyushTerm(ayushTerm);
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.detail || 'An error occurred while processing your request');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          AYUSH to ICD-11 Mapping
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter AYUSH Term"
              variant="outlined"
              value={ayushTerm}
              onChange={(e) => setAyushTerm(e.target.value)}
              required
              placeholder="e.g., Madhumeha, Amlapitta, Sandhivata"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Map to ICD-11'}
            </Button>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mapping Result
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">AYUSH Term:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{result.ayush_term}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">ICD-11 Code:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{result.icd_code}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Disease Name:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{result.disease_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Confidence:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{result.confidence}%</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Source:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{result.source}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Explanation:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{result.explanation}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        <Button 
          variant="outlined" 
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default MappingForm;