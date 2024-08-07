import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export const register = async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  };

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const sendChatMessage = async (system: string, prompt: string) => {
    const response = await api.post('/crewai/ask', null, {
      params: { system, prompt }
    });
    console.log(response.data);
    return response.data;
  };

export default api;
