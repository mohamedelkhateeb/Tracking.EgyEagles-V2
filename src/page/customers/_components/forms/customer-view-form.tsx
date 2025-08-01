import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/httpService";
import CustomerFormInputs from "./customer-inputs";
import LoadingButton from "@/components/ui/loading-btn";
import UserFormInputs from "@/page/users/forms/user-form-inputs";
import { Card } from "@/components/ui/card";
import { useCustomerForm } from "@/hooks/actions/use-customer-form";
export default function CustomerViewForm({
  customerId,
}: {
  customerId: string;
}) {
  let initialData =  null;
  if (customerId != "new" && customerId != "distributer") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useQuery({
      queryKey: ["customer", customerId],
      queryFn: () => httpService.get({ url: `/customers/${customerId}` }),
    });
    // customer = await getCustomer(customerId);
    // const per = await getPermissionsForCustomer(customerId);
    // console.log({ per });
    if (!initialData) {
      notFound();
    }
  }
 const { handleSubmit } = useCustomerForm(initialData, customerId);

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
          content="Submit"
          loader="Submitting..."
          style="w-full lg:w-1/2 p-6 text-xl"
        />
      </div>{" "}
    </form>
  );
}
