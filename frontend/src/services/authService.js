import { fetchApi } from './api';

export const authService = {
  login: async (credentials) => {
    const data = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data || { token: 'mock-token', user: { name: credentials.email?.split('@')[0] || 'User', role: 'ROLE_PATIENT' } };
  },

  register: async (userData) => {
    return await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }) || { success: true };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
