import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
    const user = useAuth();

  if (user) return <Navigate to="/" replace />;
  
  return <Outlet />;
};

export default AuthRoute;
