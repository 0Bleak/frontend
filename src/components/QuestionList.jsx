import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import QuestionCard from './QuestionCard';

function QuestionList({ questions, onDelete, onUpdate, onDeleteAll }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Questions</Typography>
        <Button variant="contained" color="error" onClick={onDeleteAll}>
          Delete All
        </Button>
      </Box>
      {questions.map((question) => (
        <QuestionCard key={question._id} question={question} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </Box>
  );
}

export default QuestionList;
