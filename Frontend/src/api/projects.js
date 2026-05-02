import { apiRequest } from './client';

export async function getProjects() {
  const projects = await apiRequest('/project');
  return Array.isArray(projects) ? projects : [];
}

export async function createProject(payload) {
  return apiRequest('/project', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
