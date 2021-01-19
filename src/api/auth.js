import http from '@/axios';
import AuthHelper from '@/helpers/auth';

const pathname = '/auth';

const auth = new AuthHelper();

export async function login(payload) {
  const { data } = await http.post(`${pathname}/login`, payload);
  auth.setTokens(data);
}

export async function logout() {
  const token = auth.getRefreshToken();
  await http.post(`${pathname}/logout`, { refreshToken: token });
  auth.removeTokens();
}

export async function signup(payload) {
  return http.post(`${pathname}/signup`, payload);
}

export async function refreshToken(payload) {
  return http.post(`${pathname}/token`, payload);
}
