import { BarChart3, CheckCircle2, FolderKanban, ListTodo } from 'lucide-react';
import StatCard from '../components/StatCard';
import TaskTable from '../components/TaskTable';

export default function Dashboard({ projects, tasks }) {
  const done = tasks.filter((task) => task.status === 'done');
  const inProgress = tasks.filter((task) => task.status === 'in-progress');
  const todo = tasks.filter((task) => task.status === 'todo');

  return (
    <section className="content-grid">
      <StatCard icon={FolderKanban} label="Projects" value={projects.length} />
      <StatCard icon={ListTodo} label="Total tasks" value={tasks.length} />
      <StatCard icon={BarChart3} label="In progress" value={inProgress.length} tone="amber" />
      <StatCard icon={CheckCircle2} label="Done" value={done.length} tone="green" />

      <div className="panel wide">
        <div className="panel-title">
          <h2>Recent Tasks</h2>
          <span>{todo.length} todo</span>
        </div>
        <TaskTable tasks={tasks.slice(0, 8)} compact />
      </div>
    </section>
  );
}
