import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import GroupUsersForm from './group-user-form';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { searchParamsCache } from '@/utils/searchparams';
import { getGroupAdmins, getUsers } from '@/services/api/userService';
import { getCustomers } from '@/services/api/customerService';

export default async function GroupViewForm({ customerId }: { customerId: string }) {
  const session = await getServerSession(options);
  const PageNumber = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const PageSize = searchParamsCache.get('limit');
  const queryParams = new URLSearchParams({
    PageNumber: PageNumber.toString(),
    PageSize: PageSize.toString(),
  }).toString();
  const [groupAdmins, users, customers] = await Promise.all([
    getGroupAdmins(),
    getUsers(queryParams, search),
    getCustomers(
      {
        PageNumber: PageNumber.toString(),
        PageSize: PageSize.toString(),
      },
      search,
    ),
  ]);

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">Group Users Informations</CardTitle>
      </CardHeader>
      <CardContent>
        <GroupUsersForm customers={customers?.Data || []} users={users?.Data || []} groupAdmins={groupAdmins?.Data || []} />
      </CardContent>
    </Card>
  );
}
