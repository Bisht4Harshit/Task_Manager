import { apiRequest } from './client';

export async function getUsers() {
  const users = await apiRequest('/users');
  return Array.isArray(users) ? users : [];
}
