export const statusOptions = [
  ['todo', 'Todo'],
  ['in-progress', 'In Progress'],
  ['done', 'Done'],
];

export const defaultTaskForm = {
  title: '',
  assignedTo: '',
  status: 'todo',
};

export function getStatusLabel(status) {
  return statusOptions.find(([value]) => value === status)?.[1] || status || 'Todo';
}
