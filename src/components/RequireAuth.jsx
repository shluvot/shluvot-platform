import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const session = useSelector((state) => state.auth.session);

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
