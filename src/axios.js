import axios from 'axios';
import { apiRootUrl } from './const';

const http = axios.create({
  baseURL: apiRootUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: localStorage.getItem('accessString'),
    'Content-Type': 'application/json',
  },
});

export default http;
