import React from "react";
import { Pagination as PaginationUI } from "@heroui/react";

interface IPaginationProps {
  data: any[];
  rowsPerPage: number;
  onPaginate: React.Dispatch<React.SetStateAction<any[]>>;
  filterValue: string;
}

export function Pagination({
  data,
  rowsPerPage = 10,
  onPaginate,
  filterValue,
}: Readonly<IPaginationProps>) {
  const [page, setPage] = React.useState<number>(1);
  const [filteredData, setFilteredData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const filtered = filterValue
      ? data.filter((user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()),
        )
      : data;

    setFilteredData(filtered);
    setPage(1); // Reseta para a primeira página quando o filtro muda
  }, [data, filterValue]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const itemsPaginated = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData, rowsPerPage]);

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
