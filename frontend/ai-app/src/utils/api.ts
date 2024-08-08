import axios from 'axios';

// Create an axios instance with default settings, you have to change the url if you deployed the backend to a different url
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

// Set the authorization token for the axios instance
export const setAuthToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Clear the authorization token from the axios instance
export const clearAuthToken = () => {
    delete api.defaults.headers.common['Authorization'];
};

// Register a new user
export const register = async (username: string, email: string, password: string) => {
    try {
        const response = await api.post('/auth/register', { username, email, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail || 'An error occurred during registration');
        }
        throw new Error('An unexpected error occurred');
    }
};

// Log in an existing user
export const login = async (username: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail || 'An error occurred during login');
        }
        throw new Error('An unexpected error occurred');
    }
};

// Log out the current user
export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

// Retrieve the current user's information
export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

// Send a chat message to the AI system
export const sendChatMessage = async (system: string, prompt: string) => {
    const response = await api.post('/crewai/ask', null, {
        params: { system, prompt }
    });
    console.log(response.data);
    return response.data;
};

// Create a new ticket
export const createTicket = async (title: string, description: string, priority: string) => {
    try {
        const response = await api.post('/tickets/tickets', {
            title,
            description,
            priority,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error creating ticket:', error.response.data);
            if (error.response.status === 401) {
                throw new Error('You must be logged in to create a ticket.');
            }
            throw new Error(error.response.data.detail || 'Failed to create ticket. Please try again.');
        }
        throw new Error('An unexpected error occurred. Please try again.');
    }
};

// Retrieve a ticket by its ID
export const getTicket = async (ticketId: number) => {
    const response = await api.get(`/tickets/tickets/${ticketId}`);
    return response.data;
};

// Retrieve all tickets
export const getAllTickets = async () => {
    const response = await api.get('/tickets/tickets');
    return response.data;
};

// Generate an AI solution for a ticket
export const generateAISolution = async (ticketId: number, system: string) => {
    try {
        const response = await api.post(`/tickets/tickets/${ticketId}/ai-solution`, { system });
        return response.data;
    } catch (error) {
        console.error('Error generating AI solution:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail || 'Failed to generate AI solution. Please try again.');
        }
        throw new Error('An unexpected error occurred. Please try again.');
    }
};

// Like an AI solution
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

// Dislike an AI solution
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
