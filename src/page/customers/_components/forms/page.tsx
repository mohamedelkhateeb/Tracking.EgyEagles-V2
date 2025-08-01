import CustomerViewForm from "./customer-view-form";
import { Suspense } from "react";
import PageContainer from "@/components/global/page-container";
import FormCardSkeleton from "@/components/skeleton-loaders/form-card-skeleton";
import { useParams } from "react-router-dom";

export default function CustomerFormPage() {
  const params = useParams();


  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4 p-8 bg-slate-50">
        <Suspense fallback={<FormCardSkeleton />}>
          <CustomerViewForm customerId={params?.customer || "new"} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
