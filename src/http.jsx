import axios from 'axios';

const { VITE_API_BASE_URL, VITE_API_VERSION, VITE_API_AUTH_PREFIX } =
  import.meta.env;
const baseURL = VITE_API_BASE_URL + VITE_API_VERSION;
const http = axios.create({
  baseURL,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.baseURL = baseURL + '/' + VITE_API_AUTH_PREFIX;
    } else {
      config.baseURL = baseURL;
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'Unauthenticated.'
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default http;
