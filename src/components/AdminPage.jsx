import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Divider,
  Button,
  Grid,
  Snackbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import { questionService } from '../services/questionService';
import AddQuestion from '../components/AddQuestion';
import QuestionList from '../components/QuestionList';
import UpdateQuestion from '../components/UpdateQuestion';
import { useNavigate } from 'react-router-dom';

const RefreshButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

function AdminPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await questionService.getQuestions(token);
      setQuestions(data);
    } catch (err) {
      setError('There was an issue retrieving the questions. Please try again or contact support.');
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [token, logout, navigate]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchQuestions();
  }, [token, navigate, fetchQuestions]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddQuestion = async (data) => {
    try {
      setError(null);
      const response = await questionService.addQuestion(token, data);
      setQuestions([...questions, response.newQuestion]);
      showSnackbar('Question added successfully!');
    } catch (err) {
      setError('We encountered a problem adding your question. Please review the details and try again.');
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      setError(null);
      await questionService.deleteQuestion(token, id);
      setQuestions(questions.filter((q) => q._id !== id));
      showSnackbar('Question deleted successfully!');
    } catch (err) {
      setError('There was a problem deleting the question. Please try again.');
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  const handleDeleteAll = async () => {
    try {
      setError(null);
      await questionService.deleteAllQuestions(token);
      setQuestions([]);
      showSnackbar('All questions deleted successfully!');
    } catch (err) {
      setError('We were unable to delete all questions at this time. Please try again later.');
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  const handleUpdateQuestion = async (data) => {
    try {
      setError(null);
      const updated = await questionService.updateQuestion(token, data);
      setQuestions(questions.map((q) => (q._id === updated._id ? updated : q)));
      setEditingQuestion(null);
      showSnackbar('Question updated successfully!');
    } catch (err) {
      setError('An error occurred while updating the question. Please verify the information and try again.');
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Typography variant="h4" gutterBottom color="primary">
              Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Manage your questions and responses
            </Typography>
          </Grid>

          <Grid item>
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>

          <Grid item>
            <AddQuestion onAdd={handleAddQuestion} />
          </Grid>

          <Grid item>
            <Divider sx={{ my: 3 }} />
          </Grid>

          <Grid item>
            <QuestionList
              questions={questions}
              onDelete={handleDeleteQuestion}
              onUpdate={setEditingQuestion}
              onDeleteAll={handleDeleteAll}
            />
          </Grid>

          {editingQuestion && (
            <UpdateQuestion
              open={!!editingQuestion}
              question={editingQuestion}
              onUpdate={handleUpdateQuestion}
              onClose={() => setEditingQuestion(null)}
            />
          )}

          <Grid item container justifyContent="center">
            <RefreshButton variant="outlined" color="primary" onClick={fetchQuestions}>
              Refresh Questions
            </RefreshButton>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
}

export default AdminPage;
