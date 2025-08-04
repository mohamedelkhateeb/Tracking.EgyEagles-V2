import SignIn from "@/page/auth/Sign-in-page";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import Dashboard from "@/page/dashboard/dashboard-page";
import CustomerListingPage from "@/page/customers/_components/table/customer-list-page";
import CustomerFormPage from "@/page/customers/_components/forms/page";
import DistributerListingPage from "@/page/distributers/page";
import AllCustomersForDistributerPage from "@/page/distributers/_components/customers/page";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.HOME, element: <Dashboard /> },
  { path: PROTECTED_ROUTES.CUSTOMERS, element: <CustomerListingPage /> },
  { path: PROTECTED_ROUTES.CUSTOMER_FORM, element: <CustomerFormPage /> },
  { path: PROTECTED_ROUTES.DISTRIBUTORS, element: <DistributerListingPage /> },
  { path: PROTECTED_ROUTES.USERS_FOR_DISTRIBUTOR, element: <DistributerListingPage /> },
  { path: PROTECTED_ROUTES.CUSTOMERS_FOR_DISTRIBUTOR, element: <AllCustomersForDistributerPage /> },
  { path: PROTECTED_ROUTES.CUSTOMER_FORM, element: <CustomerFormPage /> },
  { path: PROTECTED_ROUTES.VEHICLES, element: <Dashboard /> },
  { path: PROTECTED_ROUTES.USERS, element: <Dashboard /> },
];
