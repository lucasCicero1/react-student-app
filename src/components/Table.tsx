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
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <TableUI
          aria-label="Example table with custom cells"
          bottomContent={children}
          className="dark:border dark:rounded-lg dark:border-default-100"
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
      </div>

      {/* Mobile Table */}
      <div className="md:hidden flex flex-col gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border dark:border-default-100 p-4 shadow-sm bg-white dark:bg-default-50"
          >
            {columns.map((column) => (
              <div
                key={column.uid}
                className="flex justify-between items-center py-2"
              >
                <span className="font-normal">{column.name}</span>
                <div>{renderCell(item, column.uid)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
