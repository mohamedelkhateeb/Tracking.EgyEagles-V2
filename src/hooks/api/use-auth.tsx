import { getCurrentUserQueryFn } from "@/lib/api";
import httpService from "@/lib/httpService";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    staleTime: 0,
    retry: 2,
  });
  return query;
};

export default useAuth;
