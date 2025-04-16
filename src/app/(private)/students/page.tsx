"use client";

import React from "react";
import { Button, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import { columns, renderCell as setupRenderCell } from "./renderCell";
import {
  CreateFormRef,
  ModalBodyCreate,
  modalBodyDelete,
  ModalBodyUpdate,
  ModalBodyUpdateHandle,
} from "./modalBody";

import { subtitle } from "@/src/components/primitives";
import Table from "@/src/components/Table";
import { PlusIcon } from "@/src/config/icons";
import { User as IUser } from "@/src/types";
import { Pagination } from "@/src/components/Pagination";
import { Modal } from "@/src/components/Modal";
import { InputSearch } from "@/src/components/InputSearch";
import { getStudents } from "@/src/lib/api/studentsApi";

export default function StudentPage() {
  const renderCell = React.useCallback((user: IUser, columnKey: React.Key) => {
    return setupRenderCell(user, columnKey, handleEdit, handleDelet);
  }, []);

  const handleEdit = (user: IUser): void => {
    setEditedUser(user);
    setIsModalOpen(true);
    setWhichModal("Update Student");
  };

  const handleDelet = (user: IUser): void => {
    setEditedUser(user);
    setIsModalOpen(true);
    setWhichModal("Delete Student");
  };

  const addNew = (): void => {
    setIsModalOpen(true);
    setWhichModal("Create Student");
  };

  const [studentsData, setStudentsData] = React.useState<IUser[]>([]);
  const [filteredData, setFilteredData] = React.useState<IUser[]>([]);
  const [paginatedData, setPaginatedData] = React.useState<IUser[]>([]);
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [whichModal, setWhichModal] = React.useState<string>("");
  const [editedUser, setEditedUser] = React.useState<object>({});

  const searchFields = ["name", "role"] as const;

  const { data, error } = useQuery<IUser[]>({
    queryKey: ["students"],
    queryFn: getStudents,
    staleTime: 1000 * 60 * 5, // 5 minutos - Dentro desse tempo, o React Query não faz nova requisição e usa o que tá no cache
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (data) {
      setStudentsData(data);
      setIsLoading(false);
    }
  }, [data]);

  React.useEffect(() => {
    const filtered = filterValue
      ? studentsData.filter((user) =>
          searchFields.some((field) =>
            user[field]
              .toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase()),
          ),
        )
      : studentsData;

    setFilteredData(filtered);
  }, [studentsData, filterValue]);

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
            placeholder={"Search by name and role..."}
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

  const updateFormRef = React.useRef<ModalBodyUpdateHandle>(null);
  const createFormRef = React.useRef<CreateFormRef>(null);

  const getModalBody = (modalDescription: string): React.JSX.Element => {
    return {
      "Create Student": <ModalBodyCreate ref={createFormRef} />,
      "Update Student": (
        <ModalBodyUpdate ref={updateFormRef} data={editedUser} />
      ),
      "Delete Student": modalBodyDelete(editedUser),
    }[modalDescription]!;
  };

  return (
    <div>
      <div className={subtitle({ class: "my-8 tracking-wider" })}>Students</div>
      <section className="w-full">
        {isLoading ? (
          <Spinner
            className="flex"
            color="primary"
            label="Loading..."
            size="lg"
          />
        ) : (
          <Table
            columns={columns}
            data={paginatedData}
            renderCell={renderCell}
            topContent={topContentTable}
          >
            <Pagination
              data={filteredData}
              rowsPerPage={4}
              onPaginate={setPaginatedData}
            />
          </Table>
        )}
        <Modal
          body={getModalBody(whichModal)}
          header={whichModal}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSave={() => {
            if (whichModal === "Create Student") {
              const data = createFormRef.current?.getFormData();

              console.log("data:", data);
            }
            if (whichModal === "Update Student") {
              const formData = updateFormRef.current?.getFormData();

              console.log("Dados do formulário de update:", formData);
            }
          }}
        />
      </section>
    </div>
  );
}
