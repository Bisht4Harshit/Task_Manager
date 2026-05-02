import { useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import { loginUser, registerUser } from '../api/auth';

const initialForm = {
  username: '',
  email: '',
  password: '',
  role: 'member',
};

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');

    try {
      if (mode === 'register') {
        await registerUser(form);
        setMode('login');
        setNotice('Account created. Login with the same email and password.');
        return;
      }

      const user = await loginUser({ email: form.email, password: form.password });
      onLogin(user);
    } catch (err) {
      localStorage.removeItem('ttm_token');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div>
          <p className="eyebrow">Team Workspace</p>
          <h1>Team Task Manager</h1>
          <p className="muted">Sign in, track assigned work, and keep projects moving.</p>
        </div>

        <div className="segmented" role="tablist" aria-label="Authentication mode">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Login
          </button>
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>
            Signup
          </button>
        </div>

        <form className="stack" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Username
              <input
                required
                value={form.username}
                onChange={(event) => updateField('username', event.target.value)}
                placeholder="Harshit"
              />
            </label>
          )}

          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              required
              type="password"
              minLength="6"
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              placeholder="Minimum 6 characters"
            />
          </label>

          {mode === 'register' && (
            <label>
              Role
              <select value={form.role} onChange={(event) => updateField('role', event.target.value)}>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          )}

          {notice && <div className="notice">{notice}</div>}
          <AlertMessage>{error}</AlertMessage>

          <button className="primary" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </section>
    </main>
  );
}
