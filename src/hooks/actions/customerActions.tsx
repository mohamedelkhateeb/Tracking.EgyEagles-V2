import { useState } from "react";

import { useRouter } from "next/navigation";
import { Customer } from "@/types/customer.model";
import { DEFAULT_CUSTOMER } from "@/constant/config/customerDefaultValues";
import { transformForApi } from "@/utils/customer-transformations";
import { useMutation } from "@tanstack/react-query";
import httpService from "@/lib/httpService";

export const useCustomerActions = (
  initialData: Customer,
  customerType: string | string[] = "new"
) => {
  const { mutate } = useMutation({
    mutationFn: (data: any) =>
      httpService.post<any>({
        url: "/customers",
        data: data,
      }),
  });
  const [errors, setErrors] = useState<any>({});
  const [data, setData] = useState<Customer>({
    ...DEFAULT_CUSTOMER,
    ...initialData,
  });
  const handleChange = (e: any) => {
    if (errors[e.target.name]) {
      setErrors((prev: any) => ({ ...prev, [e.target.name]: undefined }));
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const dataToSubmit = transformForApi(data);

    mutate(dataToSubmit, {
      onSuccess: (res) => {
        console.log(res);
        console.log(res);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.log(error);
      },
    });

    // if (response.Success) {
    //   toast.success('Customer created successfully');
    //   router.push('/customers');
    // } else {
    //   toast.error(response.Message || 'Something went wrong, please try again later');
    // }
  };
  return {
    data,
    setData,
    errors,
    handleChange,
    setErrors,
    handleSubmit,
  };
};
