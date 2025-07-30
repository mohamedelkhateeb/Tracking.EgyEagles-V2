import httpService from "@/lib/httpService";
import { Profile, Response } from "@/types/api.type";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

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

  const query = useSuspenseQuery<Response<Profile>>({
    queryKey: ["authUser"],
    queryFn: () =>
      httpService.get({ url: `/users/a337e630-a20e-411a-8ffb-c6f5a9144858` }),
    staleTime: 0,
    retry: 2,
  });


  return query?.data?.Data
};

export default useAuth;
