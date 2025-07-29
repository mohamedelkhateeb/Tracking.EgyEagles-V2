export type Customer = {
  Id: string;
  CreatedDate: string;
  CreatedBy: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CustomerName: string;
  EmailAddress: string;
  PhoneNumber: string;
  CustomerType: string;
  Address: string;
  City: string;
  ZipCode: string;
  Country: string;
  Location: string | null;
  Website: string | null;
  IdentityNumber: string;
  CommercialRecordNumber: string | null;
  CommercialRecordIssueDate: string | null;
  DateOfBirth: string | null;
  Comments: string | null;
  UpLevelId: string;
  ImageUrl: string | null;
  ContractNumber: string | null;
  ContractPath: string | null;
};


export type CustomerCreateDistributerModel = {
  Customer: {
    CustomerName: string;
    EmailAddress: string;
    PhoneNumber: string;
    CustomerType: string;
    City: string;
    ZipCode: string;
    Country: string;
    Address: string;
    IdentityNumber: string;
    UplevelId: string;
  };
  Admin: {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
  };
  Claims: string[];
  Image?: File | null;
};
