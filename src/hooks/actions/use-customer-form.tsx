import { Customer } from "@/types/customer.model";
import { useMutation } from "@tanstack/react-query";
import httpService from "@/lib/httpService";
import { useTranslation } from "react-i18next";
import { getCustomerSchema } from "@/types/zod/customer.zod";
import useCustomerFormStore from "@/lib/store/customer-form/use-customer-form";
import { useAuthContext } from "@/context/auth-provider";

export const useCustomerForm = (
  initialData: Customer,
  customerType: string | string[]
) => {
  const { mutate } = useMutation({
    mutationFn: (data: any) =>
      httpService.post<any>({
        url: `/customers/${customerType}`,
        data: data,
      }),
  });
  const { CustomerData, UserData, Errors, setErrors } = useCustomerFormStore(
    (state) => state
  );

  const { user } = useAuthContext();

  const handleChange = (e: any) => {
    if (Errors[e.target.name]) {
      setErrors((prev: any) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const { t } = useTranslation();

  const customerSchema = getCustomerSchema(t);
  const handleSubmit = (e: any) => {
    CustomerData.PhoneNumber = "+966" + CustomerData.PhoneNumber;
    if (customerType === "distributer") {
      CustomerData.CustomerType = 2;
      CustomerData.UpLevelId = user.CustomerId;
    }
    e.preventDefault();
    const result = customerSchema.safeParse({ ...CustomerData, ...UserData });

    // if (!result.success) {
    //   setErrors(result.error.flatten().fieldErrors);
    //   return;
    // }

    // const dataToSubmit = transformForApi(data);

    mutate(
      { Customer: CustomerData, Admin: UserData },
      {
        onSuccess: (res) => {
          console.log(res);
          console.log(res);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          console.log(error);
        },
      }
    );

    // if (response.Success) {
    //   toast.success('Customer created successfully');
    //   router.push('/customers');
    // } else {
    //   toast.error(response.Message || 'Something went wrong, please try again later');
    // }
  };
  return {
    Errors,
    handleChange,
    setErrors,
    handleSubmit,
  };
};
