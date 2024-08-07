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


export const createTicket = async (title: string, description: string, priority: string) => {
  try {
    const currentUser = await getMe();
    console.log(currentUser);
    const response = await api.post('/tickets/tickets', {
      title,
      description,
      priority,

    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error creating ticket:', error.response.data);
      throw new Error('Failed to create ticket. Please make sure you are logged in and try again.');
    }
    throw error;
  }
};

export const getTicket = async (ticketId: number) => {
    const response = await api.get(`/tickets/tickets/${ticketId}`);
    return response.data;
  };

export const getAllTickets = async () => {
    const response = await api.get('/tickets/tickets');
    return response.data;
  };

export const generateAISolution = async (ticketId: number, system: string) => {
    const response = await api.post(`/tickets/tickets/${ticketId}/ai-solution`, { system });
    return response.data;
  };


export const likeAISolution = async (solutionId: number) => {
  try {
    const response = await api.post(`/tickets/ai-solutions/${solutionId}/like`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error liking AI solution:', error.response.data);
      throw new Error('Failed to like AI solution. Only admins can like or dislike solutions.');
    }
    throw error;
  }
};

export const dislikeAISolution = async (solutionId: number) => {
  try {
    const response = await api.post(`/tickets/ai-solutions/${solutionId}/dislike`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error disliking AI solution:', error.response.data);
      throw new Error('Failed to dislike AI solution. Only admins can like or dislike solutions.');
    }
    throw error;
  }
};

export default api;
