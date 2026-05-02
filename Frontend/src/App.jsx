import { useState } from 'react';
import AlertMessage from './components/AlertMessage';
import Sidebar from './components/Sidebar';
import AuthScreen from './pages/AuthScreen';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import { logoutUser } from './api/auth';
import { useWorkspaceData } from './hooks/useWorkspaceData';
import { normalizeUser } from './utils/user';

function getStoredUser() {
  return normalizeUser(JSON.parse(localStorage.getItem('ttm_user') || 'null'));
}

function getPageTitle(view) {
  return view === 'dashboard' ? 'Dashboard' : view[0].toUpperCase() + view.slice(1);
}

export default function App() {
  const [user, setUser] = useState(getStoredUser);
  const [view, setView] = useState('dashboard');
  const workspace = useWorkspaceData(user);
  const isAdmin = user?.role === 'admin';

  function handleLogout() {
    logoutUser();
    setUser(null);
  }

  if (!user) {
    return <AuthScreen onLogin={setUser} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeView={view}
        isAdmin={isAdmin}
        onNavigate={setView}
        onLogout={handleLogout}
      />

      <main className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">{user.role}</p>
            <h1>{getPageTitle(view)}</h1>
          </div>
          <div className="user-chip">
            <span>{user.username || user.email}</span>
          </div>
        </header>

        {workspace.loading && <div className="notice">Loading workspace data...</div>}
        <AlertMessage>{workspace.error}</AlertMessage>

        {view === 'dashboard' && (
          <Dashboard projects={workspace.projects} tasks={workspace.tasks} />
        )}

        {view === 'projects' && (
          <Projects isAdmin={isAdmin} projects={workspace.projects} reload={workspace.reload} />
        )}

        {view === 'tasks' && (
          <Tasks
            isAdmin={isAdmin}
            tasks={workspace.tasks}
            members={workspace.members}
            membersError={workspace.membersError}
            reload={workspace.reload}
          />
        )}

        {view === 'team' && (
          <Profile user={user} members={workspace.members} />
        )}
      </main>
    </div>
  );
}
