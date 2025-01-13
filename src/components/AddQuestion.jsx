import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
} from '@mui/material';

function AddQuestion({ onAdd }) {
  const [questionLabel, setQuestionLabel] = useState('');
  const [options, setOptions] = useState([{ value: '', url: '' }]);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index][e.target.name] = e.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => setOptions([...options, { value: '', url: '' }]);

  const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { label: questionLabel, options };

    try {
      await onAdd(data);
      setQuestionLabel('');
      setOptions([{ value: '', url: '' }]);
      alert('Question added successfully!');
    } catch {
      alert('Failed to add question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        border: '1px solid #ddd',
        borderRadius: 2,
        mb: 4,
        maxWidth: 800,
        mx: 'auto',
      }}
    >
      <Typography variant="h6">Add a New Question</Typography>
      <TextField
        fullWidth
        label="Question Label"
        variant="outlined"
        value={questionLabel}
        onChange={(e) => setQuestionLabel(e.target.value)}
        required
        sx={{ mt: 2, mb: 2 }}
      />
      <Grid container spacing={2}>
        {options.map((option, index) => (
          <Grid key={index} item xs={12} sm={6} md={6} lg={6}>
            <Box sx={{ mb: 2 }}> {/* Added margin bottom to the container */}
              <TextField
                label="Value"
                name="value"
                variant="outlined"
                value={option.value}
                onChange={(e) => handleOptionChange(index, e)}
                required
                fullWidth
                sx={{ mb: 1 }} // Margin bottom for spacing between fields on small screens
              />
              <TextField
                label="URL (Optional)"
                name="url"
                variant="outlined"
                value={option.url}
                onChange={(e) => handleOptionChange(index, e)}
                fullWidth
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}> {/* Position button to the right */}
                <Button color="error" variant="contained" onClick={() => handleRemoveOption(index)} size="small">
                  Remove
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="outlined" fullWidth onClick={handleAddOption} sx={{ mt: 2 }}>
            Add Option
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {loading ? 'Adding...' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddQuestion;