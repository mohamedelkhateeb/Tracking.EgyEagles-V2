import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import UserPermissionForm from './user-permission-form';
import { getUserPermissions } from '@/services/api/userService';

type Props = { userId: string; type?: string };
export default async function UserPermissionsViewForm({ userId, type }: Props) {
  let initalData = null;
  if (type == 'remove' || type == 'temp') {
    const result = await getUserPermissions(userId);
    console.log(result);
    if (result?.Success) {
      initalData = result.Data.flatMap((group: any) => group.Permissions.map((permission: any) => permission.ClaimValue));
    }
  }
  return (
    <Card className="mx-auto w-[96%]">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {type == 'add' ? 'Add New Permission for User' : type == 'temp' ? 'Add Temporary Permission for User' : 'Remove Permission form User'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UserPermissionForm userId={userId} initalData={initalData} type={type} />
      </CardContent>
    </Card>
  );
}
