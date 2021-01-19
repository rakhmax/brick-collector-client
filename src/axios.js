/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { apiRootUrl } from './const';

const http = axios.create({
  baseURL: apiRootUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  async (config) => {
    const value = localStorage.getItem('creds');

    if (value) {
      const keys = JSON.parse(value);

      config.headers = {
        Authorization: `Bearer ${keys.accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

http.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const value = localStorage.getItem('creds');

    if (value) {
      const keys = JSON.parse(value);

      const { data } = await http.post('/auth/token', {
        userId: keys.userId,
        username: keys.username,
        refreshToken: keys.refreshToken,
      });

      axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

      localStorage.setItem('creds', JSON.stringify({
        userId: keys.userId,
        ...data,
      }));

      return http(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default http;
