import React from "react";
import { Pagination as PaginationUI } from "@heroui/react";

interface IPaginationProps {
  data: any[];
  rowsPerPage: number;
  onPaginate: (itemsPaginated: any[]) => any;
}

export function Pagination({
  data,
  rowsPerPage = 10,
  onPaginate,
}: Readonly<IPaginationProps>) {
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(data.length / rowsPerPage);

  const itemsPaginated = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data, rowsPerPage]);

  // ✅ Faz o cache da função onPaginate, evitando re-renderizações desnecessárias pelo useEffect.
  const cachedOnPaginate = React.useCallback(onPaginate, []);

  React.useEffect(() => {
    cachedOnPaginate(itemsPaginated);
  }, [itemsPaginated, cachedOnPaginate]);

  return (
    <div className="flex w-full justify-center">
      <PaginationUI
        isCompact
        showControls
        showShadow
        color="secondary"
        page={page}
        total={pages}
        onChange={setPage}
      />
    </div>
  );
}
