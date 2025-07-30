import PageContainer from '@/components/layout/page-container';
import CustomerViewForm from './customer-view-form';
import { Suspense } from 'react';
import FormCardSkeleton from '@/components/skeletons/form-card-skeleton';

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
