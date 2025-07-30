'use client';
import React, { useState } from 'react';
import DualListbox from './custom-dual-listbox';
import LoadingButton from '@/components/ui/custom-buttons/loading-btn';
import CustomerSelection from '@/components/common/customer-selection';
import InputField from '@/components/Fields/input-field';
import { Customer } from '@/types/models/customer.model';
import { User } from '@/types/models/user.model';
import SelectField from '@/components/Fields/select-field';
import { createGroupUsers } from '@/services/api/userService';
import { PermissionsView } from '../../forms/permissions-view';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

const GroupUsersForm = ({ customers, users, groupAdmins }: { customers: Customer[]; users: User[]; groupAdmins: User[] }) => {
  const router = useRouter();
  const [data, setData] = useState<any>({ Users: [], CustomerId: '', GroupName: '', Claims: [] });
  const handleSubmit = async (formData: FormData) => {
    const objectedData = Object.fromEntries(formData);
    console.log({ ...data, ...objectedData });
    const result: any = await createGroupUsers({ ...data, ...objectedData });
    if (result?.Success) {
      router.back();
      toast({
        title: 'User created successfully',
        description: 'Check the list of users',
      });
    } else {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: result?.Message,
      });
    }
  };

  return (
    <form action={handleSubmit} className="max-h-[100%] overflow-auto p-2" about="">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <InputField name="GroupName" placeholder="Enter group name" required label="Group Name" />
        <CustomerSelection name="CustomerId" errors={[]} endpoint="customers/companies_individuals" data={customers} placeholder="Select Customer" label="Customer Selection" />
        <SelectField
          placeholder="Group Admin"
          name=""
          label="Group Admin"
          options={[...groupAdmins].map((u) => ({ value: u?.Id, label: u?.UserName }))}
          onChange={(e) => {
            const admin = groupAdmins?.find((u) => u?.Id == e.target.value);
            setData({ ...data, Users: [...data?.Users, { Id: admin?.Id, Name: admin?.UserName, Email: admin?.Email, UserType: admin?.UserType }] });
          }}
          required
          defaultValue={data?.GroupId}
          errors={{}}
        />
      </div>
      <DualListbox
        data={users?.map((u) => {
          return { Id: u?.Id, Name: u?.UserName, Email: u?.Email, UserType: u?.UserType };
        })}
        setData={setData}
        Data={data}
      />
      <PermissionsView data={data} setData={setData} />
      <LoadingButton content="Submit" loader="Submitting..." style="mt-5" />
    </form>
  );
};

export default GroupUsersForm;
