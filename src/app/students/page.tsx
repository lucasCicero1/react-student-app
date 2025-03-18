"use client";

import React from "react";
import { User, Chip, Tooltip, Input, ChipProps, Button } from "@heroui/react";
import { IdCard, User as UserIcon } from "lucide-react";

import { subtitle } from "@/src/components/primitives";
import Table from "@/src/components/Table";
import {
  DeleteIcon,
  EditIcon,
  SearchIcon,
  PlusIcon,
  MailIcon,
} from "@/src/config/icons";
import { User as IUser } from "@/src/types";
import { Pagination } from "@/src/components/Pagination";
import { users } from "@/src/lib/data";
import { Modal } from "@/src/components/Modal";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function StudentPage() {
  const renderCell = React.useCallback((user: IUser, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof IUser];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
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
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            classNames={{
              input:
                "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
            }}
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
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

  const modalBody = (
    <div className="space-y-4">
      <Input
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        endContent={
          <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Name"
        placeholder="Enter your name"
        variant="bordered"
      />
      <Input
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
      />
      <Input
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        endContent={
          <IdCard className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="CPF"
        placeholder="Enter your cpf"
        variant="bordered"
      />
    </div>
  );

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
