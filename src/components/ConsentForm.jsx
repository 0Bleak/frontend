import React, { useState } from "react";
import { Box, Typography, Button, FormControlLabel, Checkbox, Alert, Paper } from "@mui/material";
import axios from "axios";

const ConsentForm = ({ personalInfo }) => {
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleConsentChange = (e) => {
    setConsent(e.target.checked);
    setMessage("");
    setError("");
  };

  const handleSubmit = async () => {
    try {
      if (consent) {
        const { name, lastName, email } = personalInfo;
        await axios.post("/api/user-info", {
          firstName: name,
          lastName,
          email,
          consent: true,
        });
        setMessage("Your information has been saved successfully.");
      } else {
        setMessage("Your data has been disposed of.");
      }
    } catch (err) {
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 4, backgroundColor: '#f8f9fa', boxShadow: 2 }}>
      <Typography variant="h6" gutterBottom align="center">
        Consent Form
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={consent}
            onChange={handleConsentChange}
            color="primary"
          />
        }
        label="Do you consent to us keeping your data for future communication?"
      />
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit Consent
        </Button>
      </Box>
      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Paper>
  );
};

export default ConsentForm;
