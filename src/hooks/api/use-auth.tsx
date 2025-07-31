import httpService from "@/lib/httpService";
import { Profile, Response } from "@/types/api.type";
import { useSuspenseQuery } from "@tanstack/react-query";

export type DecodedToken = {
  name: string;
  sub: string;
  email: string;
  CustomerId: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
  iss: string;
  aud: string;
};

const useAuth = () => {
  const id = localStorage.getItem("id");
  const query = useSuspenseQuery<Response<Profile>>({
    queryKey: ["authUser"],
    queryFn: () => httpService.get({ url: `/users/${id}` }),
    staleTime: 0,
    retry: 2,
  });

  return query?.data?.Data;
};

export default useAuth;
