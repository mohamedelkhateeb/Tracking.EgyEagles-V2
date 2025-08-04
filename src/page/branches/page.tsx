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
import { columns } from "../distributers/_components/customers/columns";

export default function BranchesListingPage() {
  const { data: branches, isPending } = useQuery<Response<CustomerData[]>>({
    queryKey: ["branches"],
    queryFn: () =>
      httpService.get({
        url: `/customers/branches`,
      }),
  });
  const data: CustomerData[] = branches?.Data || [];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Branches (${data.length})`}
            description="Find and Manage Your Branches here with advanced capabilities. "
          />
          <div className="flex space-x-2">
            <Link
              to={"/customers/new"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex gap-2 py-6"
              )}
            >
              <Plus className="h-4 w-4" />
              Add New Branch
            </Link>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={data}
            totalItems={data?.length}
            isPending={isPending}
            fileName="branches"
          />
        </div>
      </div>
    </PageContainer>
  );
}
