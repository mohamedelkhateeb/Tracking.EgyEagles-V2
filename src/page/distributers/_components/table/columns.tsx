import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CustomerData } from "@/lib/store/customer-form/customer-slice";
import StatusDialog from "@/Dialogs/StatusDialog";

export const columns: ColumnDef<CustomerData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorFn: (row) => row?.CustomerName,
    header: "NAME",
  },
  {
    accessorFn: (row) => row?.EmailAddress,
    header: "EMAIL",
  },
  {
    accessorFn: (row) => row?.IdentityNumber,
    header: "IDENTITY NUMBER",
  },
  {
    accessorFn: (row) => row?.Country,
    header: "COUNTRY",
  },
  {
    header: "STATUS",
    cell: ({ row }) => (
      <StatusDialog
        endpoint={`/customers/${row.original?.Id}/toggle-status`}
        data={{
          item: "Customer",
          placeholder: "Customer",
        }}
        row={row}
      />
    ),
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
