import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

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
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, border: '1px solid #ddd', borderRadius: 2, mb: 4 }}>
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
      {options.map((option, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            label="Value"
            name="value"
            variant="outlined"
            value={option.value}
            onChange={(e) => handleOptionChange(index, e)}
            required
            fullWidth
          />
          <TextField
            label="URL"
            name="url"
            variant="outlined"
            value={option.url}
            onChange={(e) => handleOptionChange(index, e)}
            required
            fullWidth
          />
          <Button color="error" variant="contained" onClick={() => handleRemoveOption(index)}>
            Remove
          </Button>
        </Box>
      ))}
      <Button variant="outlined" onClick={handleAddOption} sx={{ mt: 2 }}>
        Add Option
      </Button>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {loading ? 'Adding...' : 'Submit'}
      </Button>
    </Box>
  );
}

export default AddQuestion;
