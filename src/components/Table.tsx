"use client";

import React from "react";
import {
  Table as TableUI,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  // Pagination,
} from "@heroui/react";

interface ITableProps {
  columns: any[];
  data: any[];
  renderCell: (item: any, columnKey: any) => React.ReactNode;
  topContent?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Table({
  columns,
  data,
  renderCell,
  topContent,
  children,
}: Readonly<ITableProps>) {
  return (
    <TableUI
      aria-label="Example table with custom cells"
      bottomContent={children}
      radius="sm"
      topContent={topContent}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "end" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No data to display."} items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </TableUI>
  );
}
