import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useCustomerTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState("q");
  const [page, setPage] = useQueryState("page");
  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    // setPage(1);
  }, [setSearchQuery, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery;
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
  };
}
