import SignIn from "@/page/auth/Sign-in-page";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.HOME, element: <div>Protected Page !</div> },
];


