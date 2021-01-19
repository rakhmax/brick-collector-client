/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { apiRootUrl } from './const';
import AuthHelper from './helpers/auth';

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
    const auth = new AuthHelper();

    if (auth.isAuthentificated()) {
      config.headers = {
        Authorization: `Bearer ${auth.getAccessToken()}`,
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

  const auth = new AuthHelper();

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    if (auth.isAuthentificated()) {
      const { data } = await http.post('/auth/token', {
        userId: auth.getUserId(),
        username: auth.getUsername(),
        refreshToken: auth.getRefreshToken(),
      });

      axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

      auth.setTokens(data);
    }

    return http(originalRequest);
  }
  return Promise.reject(error);
});

export default http;
