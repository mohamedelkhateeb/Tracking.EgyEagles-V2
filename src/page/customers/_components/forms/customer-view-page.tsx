import FormCardSkeleton from '@/components/skeleton-loaders/form-card-skeleton';
import CustomerViewForm from './customer-view-form';
import { Suspense } from 'react';
import PageContainer from '@/components/global/page-container';

export default async function CustomerViewPage({ params }: { params: { customer: string } }) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4 p-8">
        <Suspense fallback={<FormCardSkeleton />}>
          <CustomerViewForm customerId={params?.customer} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
