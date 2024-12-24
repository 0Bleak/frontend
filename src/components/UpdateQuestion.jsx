import React, { useState } from 'react';
import { TextField, Button, Box, Modal } from '@mui/material';

function UpdateQuestion({ open, onClose, question, onUpdate }) {
  const [label, setLabel] = useState(question.label);
  const [options, setOptions] = useState([...question.options]);

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index][e.target.name] = e.target.value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate({ ...question, label, options });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, background: '#fff', m: '10% auto', borderRadius: 2, maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Question Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            sx={{ mb: 2 }}
          />
          {options.map((option, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Option ${index + 1}`}
              name="value"
              value={option.value}
              onChange={(e) => handleOptionChange(index, e)}
              sx={{ mb: 2 }}
            />
          ))}
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default UpdateQuestion;
