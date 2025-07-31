import { USER_DEFAULT_STATE } from "@/constant/config/customerDefaultValues";
import { StateCreator } from "zustand";

type User = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
};
type UserSlice = {
  UserData: User;
  setUserData: (data: User) => void;
};

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  UserData: USER_DEFAULT_STATE,
  setUserData: (data) =>
    set((state) => ({ UserData: { ...state.UserData, ...data } })),
});

export default createUserSlice;
export type { User, UserSlice };
