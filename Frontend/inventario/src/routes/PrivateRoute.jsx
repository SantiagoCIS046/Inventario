import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function PrivateRoute({ children }) {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
