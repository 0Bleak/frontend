import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, Grid, Link, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledQuestionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // More pronounced shadow
  transition: 'transform 0.2s', // Add a subtle hover effect
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: 'flex-end',
  borderTop: `1px solid ${theme.palette.divider}`, // Add a subtle separator
}));

const OptionChip = styled(Chip)(({ theme }) => ({
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%', // Ensure chips don't overflow their container
}));


function QuestionCard({ question, onDelete, onUpdate }) {
  return (
    <StyledQuestionCard>
      <StyledCardContent>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold"> {/* Slightly larger heading */}
          {question.label}
        </Typography>
        <Box mt={2}> {/* Add some top margin */}
          <Grid container spacing={1}>
            {question.options.map((option, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}> {/* Adjust breakpoints for more responsiveness */}
                <Box display="flex" flexDirection="column">
                    <OptionChip label={`${index + 1}. ${option.value}`} variant="outlined" />
                    {option.url && (
                        <Link href={option.url} variant="caption" color="textSecondary" noWrap style={{overflow: 'hidden', textOverflow: 'ellipsis', display: 'block'}}>
                           {option.url}
                        </Link>
                    )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </StyledCardContent>
      <StyledCardActions>
        <Button size="small" variant="contained" color="primary" onClick={() => onUpdate(question)}>
          Update
        </Button>
        <Button size="small" variant="contained" color="error" onClick={() => onDelete(question._id)}>
          Delete
        </Button>
      </StyledCardActions>
    </StyledQuestionCard>
  );
}

export default QuestionCard;