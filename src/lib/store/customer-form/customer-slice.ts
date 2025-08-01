import { CUSTOMER_DEFAULT_STATE } from "@/constant/config/customerDefaultValues";
import { StateCreator } from "zustand";

type CustomerData = {
  Id: string;
  CreatedDate: string;
  CreatedBy: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CustomerName: string;
  EmailAddress: string;
  PhoneNumber: string;
  CustomerType: number;
  Address: string;
  City: string;
  ZipCode: string;
  Country: string;
  Location: string;
  Website: string;
  IdentityNumber: string;
  CommercialRecordNumber: string;
  CommercialRecordIssueDate: string;
  DateOfBirth: string;
  Comments: string;
  UpLevelId: string;
  ImageUrl: string;
  ContractNumber: string;
  ContractPath: string;
  Claims: string[];
  Image: null;
};

type CustomerSlice = {
  CustomerData: CustomerData;
  setCustomerData: (data: CustomerData) => void;
};

const createCustomerSlice: StateCreator<CustomerSlice> = (set) => ({
  CustomerData: CUSTOMER_DEFAULT_STATE,
  setCustomerData: (data) =>
    set((state) => ({ CustomerData: { ...state.CustomerData, ...data } })),
});

export default createCustomerSlice;
export type { CustomerData, CustomerSlice };
