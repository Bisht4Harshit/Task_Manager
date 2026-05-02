import {
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Users,
} from 'lucide-react';

const navItems = [
  ['dashboard', LayoutDashboard, 'Dashboard'],
  ['projects', FolderKanban, 'Projects'],
  ['tasks', ClipboardList, 'Tasks'],
  ['team', Users, 'Profile'],
];

export default function Sidebar({ activeView, isAdmin, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <CheckCircle2 size={28} />
        <div>
          <strong>Task Manager</strong>
          <span>{isAdmin ? 'Admin workspace' : 'Member workspace'}</span>
        </div>
      </div>

      <nav>
        {navItems.map(([id, Icon, label]) => (
          <button key={id} className={activeView === id ? 'active' : ''} onClick={() => onNavigate(id)}>
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <button className="logout" onClick={onLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
