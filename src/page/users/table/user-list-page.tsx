import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/common/Heading';
import UserTable from '.';
import Link from 'next/link';
import { searchParamsCache } from '@/utils/searchparams';
import { getUsers } from '@/services/api/userService';
import { User } from '@/types/models/user.model';
import ActionMenu from '@/components/common/action-menu';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

const breadcrumbItems = [
  { title: 'Home', link: '/' },
  { title: 'Users', link: '/users' },
];

export default async function UserListingPage() {
  const PageNumber = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const PageSize = searchParamsCache.get('limit');
  const queryParams = new URLSearchParams({
    PageNumber: PageNumber.toString(),
    PageSize: PageSize.toString(),
  }).toString();
  const users = await getUsers(queryParams, search);
  const data: User[] = users?.Data || [];

  const session = await getServerSession(options);

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Users (${data.length})`} description="Find and Manage Your Users here with advanced capabilities. " />
          <div className="flex space-x-2">
            <Link prefetch={true} href={'/users/group-admin'} className={cn(buttonVariants({ variant: 'default' }), 'flex gap-2')}>
              <Plus className="h-4 w-4" />
              Group Admin
            </Link>
            <Link prefetch={true} href={'/users/new'} className={cn(buttonVariants({ variant: 'default' }), 'flex gap-2')}>
              <Plus className="h-4 w-4" />
              New
            </Link>
          </div>
        </div>
        <Separator />
        <UserTable data={data} totalData={data.length} />
      </div>
    </PageContainer>
  );
}
