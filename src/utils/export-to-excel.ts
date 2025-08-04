import * as XLSX from "xlsx";

const exportToExcel = <TData>(
  rows: TData[],
  fileName = "exported-data",
  getExportData?: (row: TData) => Record<string, string | number>
) => {
  const exportRows = getExportData ? rows.map(getExportData) : rows;
  const worksheet = XLSX.utils.json_to_sheet(exportRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export default exportToExcel;
