

import { columns } from './columns';
import { DataTable } from '@/components/table/data-table';


export default function CustomerTable({ data, totalData }: { data: any[]; totalData: number }) {
  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
