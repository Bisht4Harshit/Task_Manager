import { Trash2 } from 'lucide-react';
import { getAssigneeName, getId } from '../utils/user';
import { getStatusLabel, statusOptions } from '../utils/taskStatus';

export default function TaskTable({ tasks, onStatusChange, onDelete, compact }) {
  if (!tasks.length) return <p className="empty">No tasks found.</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Task</th>
            {!compact && <th>Created</th>}
            <th>Assignee</th>
            <th>Status</th>
            {onDelete && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={getId(task)}>
              <td>
                <strong>{task.title}</strong>
                <span>{task._id}</span>
              </td>
              {!compact && (
                <td>{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'No date'}</td>
              )}
              <td>{getAssigneeName(task.assignedTo)}</td>
              <td>
                {onStatusChange ? (
                  <select
                    className="status-select"
                    value={task.status || 'todo'}
                    onChange={(event) => onStatusChange(task, event.target.value)}
                  >
                    {statusOptions.map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                ) : (
                  <span className={`pill ${task.status || 'todo'}`}>
                    {getStatusLabel(task.status)}
                  </span>
                )}
              </td>
              {onDelete && (
                <td>
                  <button className="icon-danger" type="button" onClick={() => onDelete(task)} title="Delete task">
                    <Trash2 size={17} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
