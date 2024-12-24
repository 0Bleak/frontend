import React, { useState, useEffect } from "react";
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Box, Typography, Container } from "@mui/material";
import axios from "axios";

function InvitePage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [personalInfo, setPersonalInfo] = useState({ name: "", lastName: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/questions");
        setQuestions(response.data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleInputChange = (e) => {
    setPersonalInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
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
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Welcome to the Invite Page</Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <Box mb={2}>
          <TextField fullWidth label="First Name" variant="outlined" name="name" value={personalInfo.name} onChange={handleInputChange} required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Last Name" variant="outlined" name="lastName" value={personalInfo.lastName} onChange={handleInputChange} required />
        </Box>
        <Box mb={2}>
          <TextField fullWidth label="Email" variant="outlined" name="email" type="email" value={personalInfo.email} onChange={handleInputChange} required />
        </Box>

        {questions.map(question => (
          <FormControl key={question._id} fullWidth margin="normal">
            <FormLabel>{question.label}</FormLabel>
            <RadioGroup name={`question-${question._id}`} value={answers[question._id] || ""} onChange={(e) => handleAnswerChange(question._id, e.target.value)}>
              {question.options.map((option, idx) => (
                <FormControlLabel key={idx} value={option.value} control={<Radio />} label={option.value} />
              ))}
            </RadioGroup>
          </FormControl>
        ))}

        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </form>

      {submitted && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>Your Responses:</Typography>
          <pre>{JSON.stringify({ personalInfo, answers }, null, 2)}</pre>
          <Typography variant="h5" gutterBottom>Suggested URLs:</Typography>
          <ul>
            {questions.map(question => {
              const answer = answers[question._id];
              const option = question.options.find(opt => opt.value === answer);
              if (!answer || !option) return null;

              const isValidUrl = /^https?:\/\//.test(option.url);
              return (
                <li key={question._id}>
                  <Typography>{question.label}: {answer} - 
                    <a href={isValidUrl ? option.url : `https://${option.url}`} target="_blank" rel="noopener noreferrer">
                      {option.url}
                    </a>
                  </Typography>
                </li>
              );
            })}
          </ul>
        </Box>
      )}
    </Container>
  );
}

export default InvitePage;
