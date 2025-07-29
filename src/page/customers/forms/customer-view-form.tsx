import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CustomerForm from './customer-form';
import { getCustomer, getPermissionsForCustomer } from '@/services/api/customerService';
import { notFound } from 'next/navigation';

export default async function CustomerViewForm({ customerId }: { customerId: string }) {
  let customer = null;
  if (customerId != 'new' && customerId != 'distributer') {
    customer = await getCustomer(customerId);
    const per = await getPermissionsForCustomer(customerId);
    console.log({ per });
    if (!customer) {
      notFound();
    }
  }
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">Customer Informations</CardTitle>
      </CardHeader>
      <CardContent>
        <CustomerForm initialData={customer} />
      </CardContent>
    </Card>
  );
}
