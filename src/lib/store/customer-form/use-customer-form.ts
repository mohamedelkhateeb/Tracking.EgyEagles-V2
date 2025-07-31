import { create } from "zustand";

import createCustomerSlice, { CustomerSlice } from "./customer-slice";
import createUserSlice, { UserSlice } from "./user-slice";
import createLocationSlice, { LocationSlice } from "./permission-slice";
import createErrorsSlice, { ErrorsSlice } from "./createErrorsSlice";

const useCustomerFormStore = create<
  CustomerSlice & LocationSlice & UserSlice & ErrorsSlice
>()((...a) => ({
  ...createCustomerSlice(...a),
  ...createUserSlice(...a),
  ...createLocationSlice(...a),
  ...createErrorsSlice(...a),
}));

export default useCustomerFormStore;
