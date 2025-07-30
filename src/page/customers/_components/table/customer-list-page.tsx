import CustomerTable from ".";
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

export default function CustomerListingPage() {
  const { isAuth, user } = useAuthContext();
  const PageNumber = 1;
  const search = "";
  const PageSize = 10;
  const queryParams = new URLSearchParams({
    PageNumber: PageNumber.toString(),
    PageSize: PageSize.toString(),
  }).toString();
  const { data: Customers } = useQuery({
    queryKey: ["Customers", queryParams],
    queryFn: () =>
      httpService.get({
        url: `customers?CustomerId=67c95725cb04cca60605fc69`,
      }),
  });

  console.log({ Customers });

  console.log({ user });

  const data: Customer[] = [];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Customers (${data.length})`}
            description="Find and Manage Your Customers here with advanced capabilities. "
          />
          <div className="flex space-x-2">
            {/* {session?.user?.Role == "SUPER_ADMIN" && (
              <Link
                prefetch={true}
                href={"/customers/distributer"}
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
              to={"/customers/new"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex gap-2"
              )}
            >
              <Plus className="h-4 w-4" />
              New
            </Link>
          </div>
        </div>
        <Separator />
        <CustomerTable data={data} totalData={data.length} />
      </div>
    </PageContainer>
  );
}
