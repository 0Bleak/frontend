import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { questionService } from '../services/questionService';
import AddQuestion from '../components/AddQuestion';
import QuestionList from '../components/QuestionList';
import UpdateQuestion from '../components/UpdateQuestion';

function AdminPage() {
  const { token, logout } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await questionService.getQuestions(token);
      setQuestions(data);
    };
    fetchQuestions();
  }, [token]);

  const handleAddQuestion = async (data) => {
    const response = await questionService.addQuestion(token, data);
    setQuestions([...questions, response.newQuestion]);
  };

  const handleDeleteQuestion = async (id) => {
    await questionService.deleteQuestion(token, id);
    setQuestions(questions.filter((q) => q._id !== id));
  };

  const handleDeleteAll = async () => {
    await questionService.deleteAllQuestions(token);
    setQuestions([]);
  };

  const handleUpdateQuestion = async (data) => {
    const updated = await questionService.updateQuestion(token, data);
    setQuestions(questions.map((q) => (q._id === updated._id ? updated : q)));
  };

  return (
    <Container>
      <Box>
        <AddQuestion onAdd={handleAddQuestion} />
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdate={setEditingQuestion}
          onDeleteAll={handleDeleteAll}
        />
        {editingQuestion && (
          <UpdateQuestion
            open={!!editingQuestion}
            question={editingQuestion}
            onUpdate={handleUpdateQuestion}
            onClose={() => setEditingQuestion(null)}
          />
        )}
      </Box>
    </Container>
  );
}

export default AdminPage;
