

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
