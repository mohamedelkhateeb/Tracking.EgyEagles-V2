import { create } from "zustand";

import createCustomerSlice, { CustomerSlice } from "./customer-slice";
import createUserSlice, { UserSlice } from "./user-slice";
import createLocationSlice, { LocationSlice } from "./permission-slice";

const useCustomerFormStore = create<
  CustomerSlice & LocationSlice & UserSlice
>()((...a) => ({
  ...createCustomerSlice(...a),
  ...createUserSlice(...a),
  ...createLocationSlice(...a),
}));

export default useCustomerFormStore;
