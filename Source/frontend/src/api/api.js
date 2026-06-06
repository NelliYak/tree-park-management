import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const role =
    localStorage.getItem('tree-park-role') ?? 'GUEST';

  config.headers.role = role;

  return config;
});

export default api;
