export function getId(value) {
  if (!value) return '';
  return value._id || value.id || value;
}

export function getAssigneeName(value) {
  if (!value) return 'Unassigned';
  if (typeof value === 'string') return value;
  return value.username || value.email || value.name || 'Unassigned';
}

export function getInitials(user) {
  const label = user?.username || user?.email || 'U';
  return label.slice(0, 1).toUpperCase();
}

export function normalizeUser(rawUser) {
  if (!rawUser) return null;

  return {
    ...rawUser,
    id: rawUser._id || rawUser.id || rawUser.userId,
    username: rawUser.username || rawUser.name || rawUser.email,
    role: String(rawUser.role || 'member').toLowerCase(),
  };
}
