import CustomerTable from "./_components/table";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageContainer from "@/components/global/page-container";
import { Heading } from "@/components/global/Heading";
import { Separator } from "@/components/ui/separator";
import { Customer } from "@/types/customer.model";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/httpService";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/auth-provider";
import { Response } from "@/types/api.type";

export default function DistributorListingPage() {
  const { isAuth, user } = useAuthContext();
  const PageNumber = 1;
  const search = "";
  const PageSize = 10;
  const queryParams = new URLSearchParams({
    PageNumber: PageNumber.toString(),
    PageSize: PageSize.toString(),
  }).toString();
  const { data: distributers } = useQuery<Response<Customer[]>>({
    queryKey: ["distributer", queryParams],
    queryFn: () =>
      httpService.get({
        url: `/customers/distributers`,
      }),
  });
  console.log({ user });

  const data: Customer[] = distributers?.Data || [];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Distributers (${data.length})`}
            description="Find and Manage Your distributer here with advanced capabilities. "
          />
          <div className="flex space-x-2">
            <Link
              to={"/distributer/new"}
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
        <CustomerTable data={data} totalData={data.length} />
      </div>
    </PageContainer>
  );
}
