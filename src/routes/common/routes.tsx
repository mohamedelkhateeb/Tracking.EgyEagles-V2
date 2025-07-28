import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK, element: <div>Google OAuth</div> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <div>Protected Page !</div> },
  { path: PROTECTED_ROUTES.TASKS, element: <div>Protected Page !</div> },
  { path: PROTECTED_ROUTES.MEMBERS, element: <div>Protected Page !</div> },
  { path: PROTECTED_ROUTES.SETTINGS, element: <div>Protected Page !</div> },
  {
    path: PROTECTED_ROUTES.PROJECT_DETAILS,
    element: <div>Protected Page !</div>,
  },
];

export const baseRoutePaths = [
  { path: BASE_ROUTE.INVITE_URL, element: <div>Base Page !</div> },
];
