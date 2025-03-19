"use client";

import React from "react";
import { Button } from "@heroui/react";

import { columns, renderCell as setupRenderCell } from "./renderCell";
import { modalBody } from "./modalBody";

import { subtitle } from "@/src/components/primitives";
import Table from "@/src/components/Table";
import { PlusIcon } from "@/src/config/icons";
import { User as IUser } from "@/src/types";
import { Pagination } from "@/src/components/Pagination";
import { users } from "@/src/lib/data";
import { Modal } from "@/src/components/Modal";
import { InputSearch } from "@/src/components/InputSearch";

export default function StudentPage() {
  const renderCell = React.useCallback((user: IUser, columnKey: React.Key) => {
    return setupRenderCell(user, columnKey);
  }, []);

  const addNew = (): void => {
    setIsModalOpen(true);
  };

  const [studentsData, setStudentsData] = React.useState<IUser[]>([]);
  const [paginatedData, setPaginatedData] = React.useState<IUser[]>([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const hasSearchFilter = Boolean(filterValue);
  const rowsPerPage = 4;

  // Filtra os itens antes da paginação
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...studentsData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [studentsData, filterValue]);

  // Simulação de carga de dados (por exemplo, de uma API)
  React.useEffect(() => {
    setTimeout(() => {
      setStudentsData(users);
      setIsLoading(false);
    }, 400);
  }, []);

  // Atualiza a paginação sempre que os itens filtrados mudam
  React.useEffect(() => {
    if (filteredItems.length > 0) {
      setPaginatedData(filteredItems.slice(0, rowsPerPage));
    } else {
      setPaginatedData([]);
    }
  }, [filteredItems, rowsPerPage]);

  const onPaginate = (itemsPaginated: any[]): void => {
    setPaginatedData(itemsPaginated);
  };

  const onSearchChange = React.useCallback((value?: string) => {
    setFilterValue(value ?? "");
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  // React.useMemo é recomendado quando o JSX depende de valores que mudam frequentemente, ex.: "filterValue"
  const topContentTable = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 flex-col sm:flex-row sm:items-end">
          <InputSearch
            filterValue={filterValue}
            onClear={onClear}
            onSearchChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button color="primary" endContent={<PlusIcon />} onPress={addNew}>
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, addNew]);

  return (
    <div>
      <div className={subtitle({ class: "my-8 tracking-wider" })}>Students</div>
      <section className="w-full">
        {isLoading ? (
          <div>Loading...</div> // Exibe uma mensagem de "Carregando..." enquanto os dados estão sendo carregados
        ) : (
          <Table
            columns={columns}
            data={paginatedData}
            renderCell={renderCell}
            topContent={topContentTable}
          >
            <Pagination
              data={filteredItems}
              rowsPerPage={rowsPerPage}
              onPaginate={onPaginate}
            />
          </Table>
        )}
        <Modal
          body={modalBody}
          header={"Create Student"}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </section>
    </div>
  );
}
