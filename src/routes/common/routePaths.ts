export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const AUTH_ROUTES = {
  SIGN_IN: "/login",
  RESET_PASSWORD: "/reset-password",
  FORGET_PASSWORD: "/forget-password",
};

export const PROTECTED_ROUTES = {
  HOME: "/",
  CUSTOMERS: "/customers",
  DISTRIBUTORS: "/distributors",
  DISTRIBUTOR_FORM: "/distributor/:distributer",
  CUSTOMER_FORM: "/customers/:customer",
  VEHICLES: "/vehicles",
  USERS: "/users",
  USER_GROUPS: "/user-groups",
};
