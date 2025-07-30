import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/common/Heading';
import { searchParamsCache } from '@/utils/searchparams';
import { getGroupUsers } from '@/services/api/userService';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import GroupsUserTable from '.';
import Link from 'next/link';
export default async function GroupUserListingPage() {
  const PageNumber = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const PageSize = searchParamsCache.get('limit');
  const queryParams = new URLSearchParams({
    PageNumber: PageNumber.toString(),
    PageSize: PageSize.toString(),
  }).toString();
  const [groupUsers] = await Promise.all([getGroupUsers(queryParams, search)]);

  // console.log(groupUsers[0]);

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Group Users (${groupUsers?.length})`} description="Find and Manage Your Group Users here with advanced capabilities. " />
          <div className="flex space-x-2">
            <Link prefetch={true} href={'/users/groups/new'} className={cn(buttonVariants({ variant: 'default' }), 'flex gap-2')}>
              <Plus className="h-4 w-4" />
              New
            </Link>
          </div>
        </div>
        <Separator />
        <GroupsUserTable data={groupUsers} totalData={0} />
      </div>
    </PageContainer>
  );
}
