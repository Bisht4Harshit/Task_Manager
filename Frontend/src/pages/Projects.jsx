import { useState } from 'react';
import { Plus, Shield } from 'lucide-react';
import AlertMessage from '../components/AlertMessage';
import { createProject } from '../api/projects';
import { getId } from '../utils/user';

const initialProject = {
  name: '',
  leader: '',
  members: '',
};

export default function Projects({ isAdmin, projects, reload }) {
  const [form, setForm] = useState(initialProject);
  const [error, setError] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleCreateProject(event) {
    event.preventDefault();
    setError('');

    try {
      await createProject(form);
      setForm(initialProject);
      reload();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="two-column">
      {isAdmin && (
        <form className="panel stack" onSubmit={handleCreateProject}>
          <div className="panel-title">
            <h2>New Project</h2>
            <Shield size={18} />
          </div>

          <label>
            Project name
            <input required value={form.name} onChange={(event) => updateField('name', event.target.value)} />
          </label>

          <label>
            Leader
            <input required value={form.leader} onChange={(event) => updateField('leader', event.target.value)} />
          </label>

          <label>
            Members
            <input
              required
              value={form.members}
              onChange={(event) => updateField('members', event.target.value)}
              placeholder="Names, emails, or team count"
            />
          </label>

          <AlertMessage>{error}</AlertMessage>
          <button className="primary"><Plus size={18} />Create project</button>
        </form>
      )}

      <div className="panel">
        <div className="panel-title">
          <h2>Projects</h2>
          <span>{projects.length} total</span>
        </div>

        <div className="list">
          {projects.map((project) => (
            <article className="project-item" key={getId(project)}>
              <div>
                <strong>{project.name}</strong>
                <p>Leader: {project.leader}</p>
              </div>
              <span>{project.members}</span>
            </article>
          ))}
          {!projects.length && <p className="empty">No projects yet.</p>}
        </div>
      </div>
    </section>
  );
}
