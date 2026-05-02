import { AlertCircle } from 'lucide-react';

export default function AlertMessage({ children }) {
  if (!children) return null;

  return (
    <div className="alert">
      <AlertCircle size={18} />
      {children}
    </div>
  );
}
