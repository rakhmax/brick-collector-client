import http from '@/axios';

const pathname = '/auth';

export async function login(payload) {
  const { data } = await http.post(`${pathname}/login`, payload);
  localStorage.setItem('creds', JSON.stringify(data));
}

export async function logout() {
  const token = JSON.parse(localStorage.getItem('creds')).refreshToken;
  await http.post(`${pathname}/logout`, { refreshToken: token });
  localStorage.removeItem('creds');
}

export async function signup(payload) {
  return http.post(`${pathname}/signup`, payload);
}

export async function refreshToken(payload) {
  return http.post(`${pathname}/token`, payload);
}
