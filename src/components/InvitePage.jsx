import React, { useState, useEffect } from "react";
import { 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel, 
  TextField, 
  Box, 
  Typography, 
  Container,
  Paper,
  CircularProgress,
  Alert
} from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";

function InvitePage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [personalInfo, setPersonalInfo] = useState({ name: "", lastName: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:5555/api/questions");
        setQuestions(response.data || []);
      } catch (error) {
        setError(error.message || 'Failed to fetch questions');
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleInputChange = (e) => {
    setPersonalInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setFormErrors(prev => ({ ...prev, [questionId]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate personal info
    if (!personalInfo.name.trim()) errors.name = "First name is required";
    if (!personalInfo.lastName.trim()) errors.lastName = "Last name is required";
    if (!personalInfo.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) errors.email = "Invalid email format";

    // Validate answers
    questions.forEach(question => {
      if (!answers[question._id]) {
        errors[question._id] = "Please select an answer";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const urls = questions.map(question => {
      const answer = answers[question._id];
      const option = question.options?.find(opt => opt.value === answer);
      if (!answer || !option) return null;
      return { question: question.label, answer, url: option.url };
    }).filter(Boolean);

    const result = { personalInfo, answers, urls };
    console.log("Submitted:", result);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {!submitted ? (
        <>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Welcome to the UPPA Forum Survey
          </Typography>
          
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
              <Box sx={{ mb: 4 }}>
                <TextField 
                  fullWidth 
                  label="First Name" 
                  variant="outlined" 
                  name="name" 
                  value={personalInfo.name} 
                  onChange={handleInputChange} 
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  sx={{ mb: 2 }}
                />
                <TextField 
                  fullWidth 
                  label="Last Name" 
                  variant="outlined" 
                  name="lastName" 
                  value={personalInfo.lastName} 
                  onChange={handleInputChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  sx={{ mb: 2 }}
                />
                <TextField 
                  fullWidth 
                  label="Email" 
                  variant="outlined" 
                  name="email" 
                  type="email" 
                  value={personalInfo.email} 
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Box>

              <Typography variant="h6" gutterBottom>Survey Questions</Typography>
              {questions.map(question => (
                <FormControl 
                  key={question._id} 
                  fullWidth 
                  margin="normal"
                  error={!!formErrors[question._id]}
                >
                  <FormLabel>{question.label}</FormLabel>
                  <RadioGroup 
                    name={`question-${question._id}`} 
                    value={answers[question._id] || ""} 
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  >
                    {question.options.map((option, idx) => (
                      <FormControlLabel 
                        key={idx} 
                        value={option.value} 
                        control={<Radio />} 
                        label={option.value} 
                      />
                    ))}
                  </RadioGroup>
                  {formErrors[question._id] && (
                    <Typography color="error" variant="caption">
                      {formErrors[question._id]}
                    </Typography>
                  )}
                </FormControl>
              ))}

              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                fullWidth
                size="large"
                sx={{ mt: 4 }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </>
      ) : (
        <Box 
          sx={{ 
            mt: 4,
            p: 3, 
            backgroundColor: '#f8f9fa',
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', textAlign: 'center' }}>
            Thank you for your responses!
          </Typography>
          
          <Box sx={{ mt: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>Personal Information</Typography>
            <Paper sx={{ p: 2, backgroundColor: 'white' }}>
              <Typography><strong>Name:</strong> {personalInfo.name} {personalInfo.lastName}</Typography>
              <Typography><strong>Email:</strong> {personalInfo.email}</Typography>
            </Paper>
          </Box>

          <Typography variant="h6" gutterBottom>Your Selected Resources</Typography>
          <Box sx={{ 
            display: 'grid', 
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }
          }}>
            {questions.map(question => {
              const answer = answers[question._id];
              const option = question.options.find(opt => opt.value === answer);
              if (!answer || !option) return null;

              const isValidUrl = /^https?:\/\//.test(option.url);
              const finalUrl = isValidUrl ? option.url : `https://${option.url}`;

              return (
                <Paper 
                  key={question._id} 
                  sx={{ 
                    p: 2,
                    backgroundColor: 'white',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 2
                    }
                  }}
                >
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {question.label}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Your choice: <strong>{answer}</strong>
                  </Typography>
                  <Button 
                    variant="outlined"
                    color="primary"
                    size="small"
                    href={finalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LaunchIcon />}
                    sx={{ mt: 1 }}
                  >
                    Visit Resource
                  </Button>
                </Paper>
              );
            })}
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
              startIcon={<RefreshIcon />}
            >
              Submit Another Response
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default InvitePage;