

import { useCustomerTableFilters } from './useCustomerTableFilters';
import { columns } from './columns';
import { DataTableResetFilter } from '@/components/table/data-table-reset-filter';
import { DataTable } from '@/components/table/data-table';
import { DataTableSearch } from '@/components/table/data-table-search';

export default function CustomerTable({ data, totalData }: { data: any[]; totalData: number }) {
  const { isAnyFilterActive, resetFilters, searchQuery, setPage, setSearchQuery } = useCustomerTableFilters();
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch searchKey="name" searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
        <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
