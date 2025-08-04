import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import httpService from "@/lib/httpService";
import { getCustomerSchema } from "@/types/zod/customer.zod";
import { CustomerData } from "@/lib/store/customer-form/customer-slice";
import useCustomerFormStore from "@/lib/store/customer-form/use-customer-form";
import { useAuthContext } from "@/context/auth-provider";
import { CustomAlert } from "@/components/ui/custom-alert";
import { useNavigate } from "react-router-dom";

type Mode = "new" | "distributer" | string;

interface UseCustomerFormProps {
  initialData: CustomerData | null;
  mode: Mode;
}

export const useCustomerForm = ({
  initialData,
  mode,
}: UseCustomerFormProps) => {
  const { CustomerData, UserData, Errors, setErrors, setCustomerData } =
    useCustomerFormStore((state) => state);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { user } = useAuthContext();

  // Load initial data on edit
  useEffect(() => {
    if (initialData) {
      setErrors({});
      setCustomerData(initialData);
    }
  }, [initialData, setCustomerData, setErrors]);

  const isCreate = mode === "new" || mode === "distributer";
  const isDistributer = mode === "distributer";

  // Mutation for create or update
  const mutation = useMutation({
    mutationFn: (payload: any) =>
      httpService[isCreate ? "post" : "put"]({
        url: `/customers/${mode}${
          CustomerData?.CustomerType == "Distributer" ? `/distributer` : ""
        }`,
        data: payload,
      }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const customerSchema = getCustomerSchema(t);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Normalize phone
    if (!CustomerData.PhoneNumber.startsWith("+966")) {
      CustomerData.PhoneNumber = "+966" + CustomerData.PhoneNumber;
    }

    // For Distributer, attach type and parent
    if (isDistributer) {
      CustomerData.CustomerType = 2;
      CustomerData.UpLevelId = user.CustomerId;
    }

    // Run Zod validation for create only
    if (isCreate) {
      const validation = customerSchema.safeParse({
        ...CustomerData,
        ...UserData,
      });

      if (!validation.success) {
        setErrors(validation.error.flatten().fieldErrors);
        return;
      }
    }

    const payload = isCreate
      ? { Customer: CustomerData, Admin: UserData }
      : CustomerData;

    mutation.mutate(payload, {
      onSuccess: (res) => {
        navigate(mode === "distributer" ? "/distributers" : "/customers");
        CustomAlert({
          msg: t("dataUpdatedSuccessfully"),
          type: "success",
        });
      },
      onError: (error: any) => {
        CustomAlert({
          msg: error?.response?.data?.Message || t("somethingWentWrong"),
          type: "error",
        });
      },
    });
  };

  return {
    isPending: mutation.isPending,
    Errors,
    handleChange,
    setErrors,
    handleSubmit,
  };
};
