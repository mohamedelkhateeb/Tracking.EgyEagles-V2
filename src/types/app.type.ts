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
export enum UserTypes {
  SUPER_ADMIN = 1,
  DISTRIBUTER = 2,
  ADMIN_COMPANY = 3,
  ADMIN_INDIVIDUAL = 4,
  ADMIN_BRANCH = 5,
  GROUP_ADMIN = 6,
  NORMAL_USER = 7,
  DRIVER = 8,
  DEMO_USER = 9,
  GUEST = 10,
}
