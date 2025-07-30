'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/types/models/user.model';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'UserName',
    header: 'USER NAME',
  },
  {
    accessorKey: 'Email',
    header: 'EMAIL',
  },
  {
    accessorKey: 'UserType',
    header: 'ROLE',
  },
  {
    accessorKey: 'CreationByName',
    header: 'CREATED BY',
  },
  {
    accessorKey: 'PhoneNumber',
    header: 'PHONE NUMBER',
  },
  {
    id: 'actions',
    header: 'ACTIONS',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
