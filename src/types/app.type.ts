import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalItems: number;
  pageSizeOptions?: number[];
  isPending?: boolean;
  getExportData?: (row: TData) => Record<string, string | number>;
  fileName?: string;
}
