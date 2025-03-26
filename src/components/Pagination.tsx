import React from "react";
import { Pagination as PaginationUI } from "@heroui/react";

interface IPaginationProps {
  data: any[];
  rowsPerPage: number;
  onPaginate: React.Dispatch<React.SetStateAction<any[]>>;
}

export function Pagination({
  data,
  rowsPerPage = 10,
  onPaginate,
}: Readonly<IPaginationProps>) {
  const [page, setPage] = React.useState<number>(1);

  React.useEffect(() => {
    setPage(1); // Reseta para a primeira página quando os dados filtrados mudam
  }, [data]);

  const pages = Math.ceil(data.length / rowsPerPage);

  const itemsPaginated = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data, rowsPerPage]);

  React.useEffect(() => {
    onPaginate(itemsPaginated);
  }, [itemsPaginated, onPaginate]);

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
