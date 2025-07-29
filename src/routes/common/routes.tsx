import SignIn from "@/page/auth/Sign-in-page";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
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
