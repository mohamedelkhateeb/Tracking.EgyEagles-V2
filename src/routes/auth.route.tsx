import useAuth from "@/hooks/api/use-auth";
import { Outlet } from "react-router-dom";

const AuthRoute = () => {
    const user = useAuth();

  console.log({ user });
  
  return <Outlet />;
};

export default AuthRoute;
