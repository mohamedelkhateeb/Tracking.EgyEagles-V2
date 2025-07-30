import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import FormCardSkeleton from '@/components/skeletons/form-card-skeleton';
import GroupViewForm from './group-view-form';

export default async function GroupUsersViewPage({ params }: { params: { customer: string } }) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4 p-8">
        <Suspense fallback={<FormCardSkeleton />}>
          <GroupViewForm customerId={params?.customer} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
