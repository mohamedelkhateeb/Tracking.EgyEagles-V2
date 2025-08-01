import { Customer } from "@/types/customer.model";
import { useMutation } from "@tanstack/react-query";
import httpService from "@/lib/httpService";
import { useTranslation } from "react-i18next";
import { getCustomerSchema } from "@/types/zod/customer.zod";
import useCustomerFormStore from "@/lib/store/customer-form/use-customer-form";
import { useAuthContext } from "@/context/auth-provider";
import { CustomAlert } from "@/components/ui/custom-alert";
import { useEffect } from "react";
import { CustomerData } from "@/lib/store/customer-form/customer-slice";

export const useCustomerForm = (
  initialData: CustomerData | null,
  customerType: string | string[] | number
) => {
  const { CustomerData, UserData, Errors, setErrors, setCustomerData } =
    useCustomerFormStore((state) => state);

  useEffect(() => {
    if (initialData) {
      setErrors({} as any);
      setCustomerData(initialData);
    }
  }, [initialData]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      httpService.post<any>({
        url: `/customers/${customerType}`,
        data: data,
      }),
  });
  const { user } = useAuthContext();

  const handleChange = (e: any) => {
    if (Errors[e.target.name]) {
      setErrors((prev: any) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const { t } = useTranslation();

  const customerSchema = getCustomerSchema(t);
  const handleSubmit = (e: any) => {
    if (CustomerData.PhoneNumber) {
      CustomerData.PhoneNumber = "+966" + CustomerData.PhoneNumber;
    }
    if (customerType == "distributer") {
      CustomerData.CustomerType = 2;
      CustomerData.UpLevelId = user.CustomerId;
    }
    e.preventDefault();
    const result = customerSchema.safeParse({ ...CustomerData, ...UserData });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    // const dataToSubmit = transformForApi(data);

    mutate(
      { Customer: CustomerData, Admin: UserData },
      {
        onSuccess: (res) => {
          CustomAlert({
            msg: "Customer created successfully",
            type: "success",
          });
        },
        onError: (error: any) => {
          console.log(error);
          CustomAlert({
            msg: "Something went wrong, please try again later",
            type: "error",
          });
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
    isPending,
    Errors,
    handleChange,
    setErrors,
    handleSubmit,
  };
};
