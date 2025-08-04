import SelectField from "@/components/Fields/select-field";
import { useAuthContext } from "@/context/auth-provider";
import httpService from "@/lib/httpService";
import { CustomerData } from "@/lib/store/customer-form/customer-slice";
import { Response } from "@/types/api.type";
import { useQuery } from "@tanstack/react-query";

interface Props {
  name?: string;
  CustomerId?: string;
  errors?: any;
  endpoint: string;
  data?: any;
  placeholder: string;
  label: string;
  onChange?: any;
}

const CustomerSelection = ({
  errors,
  endpoint = "customers/companies_individuals",
  placeholder,
  label,
  onChange,
  name = "UplevelId",
}: Props) => {
  const { customerId, user } = useAuthContext();
  const { data: Data} = useQuery<Response<CustomerData[]>>({
    queryKey: [endpoint],
    queryFn: () =>
      httpService.get({
        url: endpoint,
      }),
  });
  
  return (
    <SelectField
      onChange={onChange}
      name={name}
      label={label}
      options={[
        { value: customerId, label: user?.UserName || "" },
        ...(Data?.Data || []).map((d: any) => ({
          value: d?.Id || "",
          label: d?.CustomerName || "",
        })),
      ]}
      errors={errors}
      required
      placeholder={placeholder}
    />
  );
};

export default CustomerSelection;
