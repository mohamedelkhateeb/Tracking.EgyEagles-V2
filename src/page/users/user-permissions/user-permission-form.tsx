'use client';
import LoadingButton from '@/components/ui/custom-buttons/loading-btn';
import { PermissionsView } from '../forms/permissions-view';
import { useState } from 'react';
import { permissionActions } from '@/services/api/userService';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';

export default function UserPermissionForm({ userId, initalData, type }: any) {
  const router = useRouter();
  const [data, setData] = useState<any>({
    Claims: initalData || [],
    ExpirationTime: '',
  });
  console.log({ initalData });

  const submitForm = async () => {
    if (data.Claims.length == 0) {
      toast.error('Please select at least one permission');
      return;
    }
    const result: any = await permissionActions(type, { UserId: userId, Permissions: data.Claims, ExpirationTime: data.ExpirationTime });
    console.log(result);
    if (result?.Success) {
      toast.success('Permissions updated successfully');
      router.back();
    } else {
      toast.error(result?.Message || 'Something went wrong, please try again later');
    }
  };
  console.log(data);

  return (
    <form action={submitForm} className="space-y-8">
      {type == 'temp' && (
        <>
          <h1 className="text-xl font-bold">Expiration Time</h1>
          <Input
            required
            className=""
            type="datetime-local"
            name="ExpirationTime"
            placeholder=""
            min={new Date().toISOString().slice(0, 16)}
            max={new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 16)}
            onChange={(e) => setData({ ...data, ExpirationTime: e.target.value })}
          />
        </>
      )}
      <PermissionsView data={data} setData={setData} />
      <LoadingButton content="Submit" loader="Submitting..." />
    </form>
  );
}
