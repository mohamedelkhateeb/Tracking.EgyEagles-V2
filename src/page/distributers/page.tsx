import CustomerTable from "./table";
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

export default function DistributerListingPage() {
  const { user } = useAuthContext();

  const { data: distributers } = useQuery<Response<Customer[]>>({
    queryKey: ["distributers"],
    queryFn: () =>
      httpService.get({
        url: `/customers/distributers`,
      }),
  });
  const data: Customer[] = distributers?.Data || [];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Distributers (${data.length})`}
            description="Find and Manage Your distributers here with advanced capabilities. "
          />
          <div className="flex space-x-2">
            {/* {session?.user?.Role == "SUPER_ADMIN" && (
              <Link
                prefetch={true}
                href={"/distributers/distributer"}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex gap-2"
                )}
              >
                <Plus className="h-4 w-4" />
                Distributer
              </Link>
            )} */}
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
        <CustomerTable data={data} totalData={data.length} />
      </div>
    </PageContainer>
  );
}
