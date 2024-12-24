import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';

function QuestionCard({ question, onDelete, onUpdate }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{question.label}</Typography>
        <Box>
          {question.options.map((option, index) => (
            <Typography key={index} variant="body2">
              {index + 1}. {option.value} - {option.url}
            </Typography>
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={() => onUpdate(question)}>
          Update
        </Button>
        <Button size="small" variant="contained" color="error" onClick={() => onDelete(question._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default QuestionCard;
