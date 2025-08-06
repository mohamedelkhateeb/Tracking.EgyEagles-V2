import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageContainer from "@/components/global/page-container";
import { Heading } from "@/components/global/Heading";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/httpService";
import { Link } from "react-router-dom";
import { Response } from "@/types/api.type";
import { CustomerData } from "@/lib/store/customer-form/customer-slice";
import { DataTable } from "@/components/table/data-table";
import { columns } from "../table/columns";

export default function DistributerListingPage() {
  const { data: distributers, isPending } = useQuery<Response<CustomerData[]>>({
    queryKey: ["distributers"],
    queryFn: () =>
      httpService.get({
        url: `/customers/distributers`,
      }),
  });
  const data: CustomerData[] = distributers?.Data || [];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Distributers (${data.length})`}
            description="Find and Manage Your distributers here with advanced capabilities. "
          />
          <div className="flex space-x-2">
            <Link
              to={"/customers/distributer"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex gap-2 py-6"
              )}
            >
              <Plus className="h-4 w-4" />
              Add New Distributer
            </Link>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* <DataTableSearch searchKey="name" searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} /> */}
            {/* <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} /> */}
          </div>
          <DataTable columns={columns} data={data} totalItems={data?.length} isPending={isPending} />
        </div>
      </div>
    </PageContainer>
  );
}
