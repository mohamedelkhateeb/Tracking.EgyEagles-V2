import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CustomerForm from "./customer-form";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/httpService";

export default function CustomerViewForm({
  customerId,
}: {
  customerId: string;
}) {
  let customer = null;
  if (customerId != "new" && customerId != "distributer") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useQuery({
      queryKey: ["customer", customerId],
      queryFn: () => httpService.get({ url: `/customers/${customerId}` }),
    });
    // customer = await getCustomer(customerId);
    // const per = await getPermissionsForCustomer(customerId);
    // console.log({ per });
    if (!customer) {
      notFound();
    }
  }
  return <CustomerForm initialData={customer} />;
}
