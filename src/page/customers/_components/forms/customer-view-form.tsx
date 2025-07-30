import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CustomerForm from './customer-form';
import { getCustomer, getPermissionsForCustomer } from '@/services/api/customerService';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import httpService from '@/lib/httpService';

export default async function CustomerViewForm({ customerId }: { customerId: string }) {
  let customer = null;
  if (customerId != 'new' && customerId != 'distributer') {

    const {data} = useQuery({
      queryKey: ['customer', customerId],
      queryFn: () => httpService.get({ url: `/customers/${customerId}` }),
    })
    // customer = await getCustomer(customerId);
    // const per = await getPermissionsForCustomer(customerId);
    // console.log({ per });
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
