import { useCustomerActions } from "@/hooks/actions/customerActions";
import CustomerFormInputs from "./customer-inputs";
import { useParams } from "next/navigation";
import LoadingButton from "@/components/ui/loading-btn";
import { PermissionsView } from "@/page/users/forms/permissions-view";
import UserFormInputs from "@/page/users/forms/user-form-inputs";
import { Card } from "@/components/ui/card";

export default function CustomerForm({ initialData }: any) {
  const { data, setData, errors, handleChange, handleSubmit } =
    useCustomerActions(initialData, useParams()?.customer);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-5">
        <h1 className="text-xl font-bold border-b pb-2 mb-9">Customer Informations</h1>
        <CustomerFormInputs />
      </Card>{" "}
      {!initialData && (
        <Card className="p-5">
        <h1 className="text-xl font-bold border-b pb-2 mb-9">Admin Informations</h1>
          <UserFormInputs
            errors={errors}
            handleChange={handleChange}
            data={data}
            unRenderedFields={["PhoneNumber"]}
          />
        </Card>
      )}
      {/* <PermissionsView data={data} setData={setData} /> */}
      <LoadingButton content="Submit" loader="Submitting..." />
    </form>
  );
}
