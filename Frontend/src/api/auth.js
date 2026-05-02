import { apiRequest } from './client';
import { normalizeUser } from '../utils/user';

export async function getCurrentUser() {
  const currentUser = await apiRequest('/users/current');
  return normalizeUser(currentUser);
}

export async function loginUser(credentials) {
  const data = await apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (!data.accessToken) {
    throw new Error('Login response did not include an access token');
  }

  localStorage.setItem('ttm_token', data.accessToken);

  const user = await getCurrentUser();
  localStorage.setItem('ttm_user', JSON.stringify(user));

  return user;
}

export async function registerUser(payload) {
  return apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function logoutUser() {
  localStorage.removeItem('ttm_token');
  localStorage.removeItem('ttm_user');
}
