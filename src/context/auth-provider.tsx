import useAuth, { DecodedToken } from "@/hooks/api/use-auth";
import { Profile } from "@/types/api.type";
import { useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext } from "react";

// Define the context shape
type AuthContextType = {
  user: Profile & DecodedToken ;
  token: string;
  isAuth?: boolean;
  refetchAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const user = useAuth();
  const session = localStorage.getItem("session");
  const decoded: DecodedToken = jwtDecode(JSON.parse(session || ""));

  const refetchAuth = () => {
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
  };

  return (
    <AuthContext.Provider
      value={{
        user: { ...user, ...decoded } as Profile & DecodedToken,
        token: session || "",
        isAuth: !!session && !!user,
        refetchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
