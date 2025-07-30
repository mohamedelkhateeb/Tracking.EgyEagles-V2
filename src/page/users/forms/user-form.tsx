'use client';
import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LoadingButton from '@/components/ui/custom-buttons/loading-btn';
import { createUser } from '@/services/api/userService';
import { Role } from '@/types/models/role.model';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { PermissionsView } from './permissions-view';
import { TUserForm } from '@/types/models/user.model';
import { userSchema } from '@/types/schema/user';
import UserFormInputs from './user-form-inputs';
import { useHandleChange } from '@/hooks/use-remove-error';
import CustomerSelection from '@/components/common/customer-selection';
import { useSession } from 'next-auth/react';

type Props = { roles: Role[]; permissions: any[]; userId: string; initalData?: TUserForm };

export default function UserForm({ roles, permissions, userId, initalData }: Props) {
  const { data: session } = useSession();
  const [data, setData] = React.useState<TUserForm>(
    initalData || {
      FirstName: '',
      LastName: '',
      Email: '',
      RoleId: '',
      PhoneNumber: '',
      Password: '',
      CustomerId: '',
      Claims: [],
    },
  );
  const router = useRouter();
  const { handleChange, errors, setErrors } = useHandleChange();
  const submitForm = async (formData: FormData) => {
    const obj = Object.fromEntries(formData.entries());
    const result = userSchema.safeParse({ ...data, ...obj });
    console.log(result);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    try {
      const res: any = await createUser(result.data, userId);
      if (res?.Success) {
        router.back();
        toast({
          title: 'User created successfully',
          description: 'Check the list of users',
        });
      } else {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: res?.Message,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data);

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">{userId == 'new' ? 'Create User' : userId == 'group-admin' ? 'User as Group Admin' : 'Update User Data'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={submitForm} className="space-y-8">
          <UserFormInputs roles={roles} userId={userId} errors={errors} handleChange={handleChange} data={data} />
          <CustomerSelection endpoint={session?.user?.Role == 'SUPER_ADMIN' ? 'customers/all-distributers' : 'customers/companies_individuals'} label="Add For " placeholder="Select a Customer" />
          {userId == 'group-admin' && <PermissionsView data={data} setData={setData} />}
          <LoadingButton content="Submit" loader="Submitting..." />
        </form>
      </CardContent>
    </Card>
  );
}
