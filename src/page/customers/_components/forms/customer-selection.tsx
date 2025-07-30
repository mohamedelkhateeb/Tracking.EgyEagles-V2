import SelectField from "@/components/Fields/select-field";
import { useAuthContext } from "@/context/auth-provider";
import httpService from "@/lib/httpService";
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
  // const { Data = [], isLoading }: { Data: any[]; isLoading: boolean } = useClientPost(endpoint, {
  //   PageNumber: 1,
  //   PageSize: 100,
  // });

  const { data: Data=[] } = useQuery<Response<any[]>>({
    queryKey: [endpoint],
    queryFn: () =>
      httpService.get({
        url: endpoint,
      }),
  });

  console.log({ Data });
  
  return (
    <SelectField
      onChange={onChange}
      defaultValue={customerId}
      name={name}
      label={label}
      options={[
        { value: customerId, label: user?.UserName || "" },
        ...(Data || []).map((d: any) => ({
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
