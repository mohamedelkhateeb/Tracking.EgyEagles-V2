import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const user = useAuth();

  console.log({ user });

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
