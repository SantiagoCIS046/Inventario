import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function RoleRoute({ children, allowedRoles }) {
  const { user } = useAuthStore();

  // Adaptación para soportar tanto 'rol' como 'role'
  const userRole = (user?.role || user?.rol || "employee").toLowerCase();

  if (!user || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleRoute;
