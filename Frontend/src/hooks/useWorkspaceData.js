import { useEffect, useState } from 'react';
import { getProjects } from '../api/projects';
import { getTasks } from '../api/tasks';
import { getUsers } from '../api/users';

export function useWorkspaceData(user) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [membersError, setMembersError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadData() {
    if (!user) return;

    setLoading(true);
    setError('');
    setMembersError('');

    try {
      const [projectData, taskData] = await Promise.all([
        getProjects(),
        getTasks(),
      ]);

      setProjects(projectData);
      setTasks(taskData);

      if (user.role === 'admin') {
        try {
          setMembers(await getUsers());
        } catch (err) {
          setMembers([]);
          setMembersError(err.message);
        }
      } else {
        setMembers([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [user?.id]);

  return { projects, tasks, members, membersError, loading, error, reload: loadData };
}
