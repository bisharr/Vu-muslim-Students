import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!user || userRole !== "admin") {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default AdminRoute;
