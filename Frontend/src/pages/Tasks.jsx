import { useState } from 'react';
import { Plus, Shield } from 'lucide-react';
import AlertMessage from '../components/AlertMessage';
import TaskTable from '../components/TaskTable';
import { createTask, deleteTask, updateTask } from '../api/tasks';
import { defaultTaskForm, statusOptions } from '../utils/taskStatus';
import { getId } from '../utils/user';

export default function Tasks({ isAdmin, tasks, members, membersError, reload }) {
  const [form, setForm] = useState(defaultTaskForm);
  const [error, setError] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleCreateTask(event) {
    event.preventDefault();
    setError('');

    try {
      await createTask(form);
      setForm(defaultTaskForm);
      reload();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleStatusChange(task, status) {
    try {
      await updateTask(getId(task), { status });
      reload();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteTask(task) {
    const confirmed = window.confirm(`Delete "${task.title}"?`);
    if (!confirmed) return;

    try {
      await deleteTask(getId(task));
      reload();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="tasks-layout">
      {isAdmin && (
        <form className="panel stack" onSubmit={handleCreateTask}>
          <div className="panel-title">
            <h2>Create Task</h2>
            <Shield size={18} />
          </div>

          <label>
            Title
            <input required value={form.title} onChange={(event) => updateField('title', event.target.value)} />
          </label>

          <label>
            Assign to
            <select required value={form.assignedTo} onChange={(event) => updateField('assignedTo', event.target.value)}>
              <option value="">Select member by email</option>
              {members.map((member) => (
                <option key={getId(member)} value={getId(member)}>
                  {member.username} ({member.email})
                </option>
              ))}
            </select>
          </label>

          {!members.length && (
            <p className="helper-text">
              {membersError
                ? `Could not load members: ${membersError}`
                : 'No members loaded yet. Register a member account, then refresh.'}
            </p>
          )}

          <label>
            Status
            <select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
              {statusOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>

          <AlertMessage>{error}</AlertMessage>
          <button className="primary"><Plus size={18} />Create task</button>
        </form>
      )}

      <div className="panel">
        <div className="panel-title">
          <h2>Tasks</h2>
          <span>{tasks.length} total</span>
        </div>
        {error && !isAdmin && <AlertMessage>{error}</AlertMessage>}
        <TaskTable
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDelete={isAdmin ? handleDeleteTask : null}
        />
      </div>
    </section>
  );
}
