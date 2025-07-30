'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'GroupName',
    header: 'GROUP NAME',
  },
  {
    accessorKey: 'User Count',
    header: 'USERS',
    cell: ({ row }) => <h1 className="ml-5">{row.original?.Users?.length}</h1>,
  },

  {
    id: 'actions',
    header: 'ACTIONS',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
