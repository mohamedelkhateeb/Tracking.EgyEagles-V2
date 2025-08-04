import PageContainer from "@/components/global/page-container";
import { Heading } from "@/components/global/Heading";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/httpService";
import { useParams } from "react-router-dom";
import { Response } from "@/types/api.type";
import { CustomerData } from "@/lib/store/customer-form/customer-slice";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";

export default function AllCustomersForDistributerPage() {
  const id = useParams().customer;
  const { data: distributers, isPending } = useQuery<Response<CustomerData[]>>({
    queryKey: ["customersForDistributer"],
    queryFn: () =>
      httpService.get({
        url: `/customers?CustomerId=${id}`,
      }),
  });

  console.log(distributers);

  const data: CustomerData[] = distributers?.Data || [];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Customers (${data.length})`}
            description="Find and Manage Your distributers here with advanced capabilities. "
          />
        </div>
        <Separator />
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={data}
            totalItems={data?.length}
            isPending={isPending}
          />
        </div>
      </div>
    </PageContainer>
  );
}
