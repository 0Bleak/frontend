import axios from 'axios';

const BASE_URL = 'http://localhost:5555/api/questions';

export const questionService = {
  addQuestion: async (token, data) => axios.post(`${BASE_URL}/add`, data).then((res) => res.data),

  getQuestions: async (token) => axios.get(BASE_URL).then((res) => res.data),

  deleteQuestion: async (token, id) => axios.delete(`${BASE_URL}/${id}`).then((res) => res.data),

  deleteAllQuestions: async (token) => axios.delete(BASE_URL).then((res) => res.data),

  updateQuestion: async (token, data) =>
    axios.put(`${BASE_URL}/${data._id}`, data).then((res) => res.data),
};
