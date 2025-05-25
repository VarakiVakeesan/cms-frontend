import { useAdminAuth } from "../../context/AdminAuthContext";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { authToken } = useAdminAuth();
  if (!authToken) return <Navigate to="/admin-login" />;
  return children;
}