import { Navigate, Outlet } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

const ProtectedRoute = () => {
  const { data, isLoading, error } = useIsLoggedIn();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Authentication failed</div>;

  if (!data) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
