import SignIn from "@/page/auth/Sign-in-page";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.HOME, element: <div>Protected Page !</div> },
 
];

export const baseRoutePaths = [
  { path: BASE_ROUTE.INVITE_URL, element: <div>Base Page !</div> },
];
