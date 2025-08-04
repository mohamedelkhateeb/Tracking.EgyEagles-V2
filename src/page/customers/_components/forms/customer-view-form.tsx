import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import httpService from "@/lib/httpService";
import CustomerFormInputs from "./customer-inputs";
import LoadingButton from "@/components/ui/loading-btn";
import UserFormInputs from "@/page/users/forms/user-form-inputs";
import { Card } from "@/components/ui/card";
import { useCustomerForm } from "@/hooks/actions/use-customer-form";
import { Response } from "@/types/api.type";
import { CustomerData } from "@/lib/store/customer-form/customer-slice";
import { useNavigate } from "react-router-dom";
export default function CustomerViewForm({
  customerId,
}: {
  customerId:"distributer" | "new" | string;
}) {
  const navigate = useNavigate();
  let initialData = null;
  if (customerId != "new" && customerId != "distributer") {
    const { data } = useSuspenseQuery<Response<CustomerData>>({
      queryKey: ["customer", customerId],
      queryFn: () => httpService.get({ url: `/customers/${customerId}` }),
      staleTime: 0,
    });
    if (data) {
      initialData = data?.Data;
    } else {
      navigate("/distributers");
    }
  }
  const { handleSubmit, isPending } = useCustomerForm({
    initialData,
    mode: customerId,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-5">
        <h1 className="text-xl font-bold border-b pb-2 mb-9">
          Customer Informations
        </h1>
        <CustomerFormInputs />
      </Card>{" "}
      {!initialData && (
        <Card className="p-5">
          <h1 className="text-xl font-bold border-b pb-2 mb-9">
            Admin Informations
          </h1>
          <UserFormInputs unRenderedFields={["PhoneNumber"]} />
        </Card>
      )}
      {/* <PermissionsView data={data} setData={setData} /> */}
      <div className="flex items-center justify-end">
        <LoadingButton
          isPending={isPending}
          content="Submit"
          loader="Submitting..."
          style="w-full lg:w-1/2 p-6 text-xl"
        />
      </div>{" "}
    </form>
  );
}
