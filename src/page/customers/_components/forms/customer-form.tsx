import { useCustomerActions } from "@/hooks/actions/customerActions";
import CustomerFormInputs from "./customer-inputs";
import { useParams } from "next/navigation";
import { useActionState } from "react";
import LoadingButton from "@/components/ui/loading-btn";
import { PermissionsView } from "@/page/users/forms/permissions-view";
import UserFormInputs from "@/page/users/forms/user-form-inputs";

export default function CustomerForm({ initialData }: any) {
  const { data, setData, errors, handleChange, handleSubmit } =
    useCustomerActions(initialData, useParams()?.customer);
  const [state, formAction] = useActionState(handleSubmit, undefined);
  return (
    <form action={formAction} className="space-y-8">
      <CustomerFormInputs
        errors={errors}
        handleChange={handleChange}
        data={data}
      />
      {!initialData && (
        <>
          <h1 className="text-xl font-bold">Admin Informations</h1>
          <UserFormInputs
            errors={errors}
            handleChange={handleChange}
            data={data}
            unRenderedFields={["PhoneNumber"]}
          />
        </>
      )}
      <PermissionsView data={data} setData={setData} />
      <LoadingButton content="Submit" loader="Submitting..." />
    </form>
  );
}
