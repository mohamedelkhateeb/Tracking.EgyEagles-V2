import httpService from "@/lib/httpService";
import { Profile, Response } from "@/types/api.type";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

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
  const session = localStorage.getItem("session");
  console.log({ session });
  const decoded: DecodedToken = jwtDecode(JSON.parse(session || ""));

  console.log({ decoded });

  const query = useQuery<Response<Profile>>({
    queryKey: ["authUser"],
    queryFn: () =>
      httpService.get({ url: `/users/a337e630-a20e-411a-8ffb-c6f5a9144858` }),
    staleTime: 0,
    retry: 2,
  });

  console.log(query.data);

  return query?.data?.Data;
};

export default useAuth;
