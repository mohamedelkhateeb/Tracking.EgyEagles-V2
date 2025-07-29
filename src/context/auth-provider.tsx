import useAuth from "@/hooks/api/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

// Define the context shape
type AuthContextType = {
  user: User;
  token: string;
  isAuth?: boolean;
  refetchAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = {}

  const queryClient = useQueryClient();

  const refetchAuth = () => {
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        token: data?.token || "",
        isAuth: !!data?.user,
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
