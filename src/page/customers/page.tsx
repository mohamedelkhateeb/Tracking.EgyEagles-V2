import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageContainer from "@/components/global/page-container";
import { Heading } from "@/components/global/Heading";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/httpService";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/table/data-table";
import { CustomerData } from "@/lib/store/customer-form/customer-slice";
import { Response } from "@/types/api.type";
import { columns } from "./_components/table/columns";

export default function CustomerListPage() {
  
  const { data: Customers } = useQuery<Response<CustomerData[]>>({
    queryKey: ["Customer"],
    queryFn: () =>
      httpService.get({
        url: `/customers`,
      }),
    staleTime: 0,
  });
  const data: CustomerData[] = Customers?.Data || [];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Customers (${data.length})`}
            description="Find and Manage Your Customers here with advanced capabilities. "
          />
          <div className="flex space-x-2">
            <Link
              to={"/customers/new"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex gap-2"
              )}
            >
              <Plus className="h-4 w-4" />
              Add New Customer
            </Link>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={data}
            totalItems={data?.length}
            fileName="Customers"
          />
        </div>{" "}
      </div>
    </PageContainer>
  );
}
