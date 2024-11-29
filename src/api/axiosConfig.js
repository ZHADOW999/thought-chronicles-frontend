import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',  // Your FastAPI backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
}
});

// Add response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 && 
      error.response?.headers['x-refresh-required'] === 'true' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post('api/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Add interceptors to handle authentication
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
