import { apiRequest } from './client';

export async function getTasks() {
  const tasks = await apiRequest('/tasks');
  return Array.isArray(tasks) ? tasks : [];
}

export async function createTask(payload) {
  return apiRequest('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateTask(id, payload) {
  return apiRequest(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteTask(id) {
  return apiRequest(`/tasks/${id}`, {
    method: 'DELETE',
  });
}
