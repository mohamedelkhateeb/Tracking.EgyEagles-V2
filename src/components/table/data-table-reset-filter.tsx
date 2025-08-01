import { Button } from "../ui/button";

type DataTableResetFilterProps = {
  isFilterActive: boolean;
  onReset: () => void;
};

export function DataTableResetFilter({ isFilterActive, onReset }: DataTableResetFilterProps) {
  return (
    <>
      {isFilterActive ? (
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
      ) : null}
    </>
  );
}
