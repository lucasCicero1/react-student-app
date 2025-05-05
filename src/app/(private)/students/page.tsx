"use client";

import React from "react";
import { Button, Spinner } from "@heroui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { columns, renderCell as setupRenderCell } from "./renderCell";
import {
  CreateFormRef,
  DeleteFormRef,
  ModalBodyCreate,
  ModalBodyDelete,
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
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "@/src/lib/api/studentsApi";
import {
  studentDeleteSchema,
  studentSchema,
} from "@/src/lib/validators/student.schema";
import { ErrorToast, SuccessToast } from "@/src/components/Toast";

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

  const searchFields = ["name", "email"] as const;

  const { data } = useQuery<IUser[]>({
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
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-end md:gap-3 md:justify-between">
        <InputSearch
          filterValue={filterValue}
          placeholder={"Search by name and email..."}
          onClear={onClear}
          onSearchChange={onSearchChange}
        />

        <div className="flex gap-3 self-end">
          <Button color="primary" endContent={<PlusIcon />} onPress={addNew}>
            Add New
          </Button>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, addNew]);

  const updateFormRef = React.useRef<ModalBodyUpdateHandle>(null);
  const createFormRef = React.useRef<CreateFormRef>(null);
  const deleteFormRef = React.useRef<DeleteFormRef>(null);

  const getModalBody = (modalDescription: string): React.JSX.Element => {
    return {
      "Create Student": <ModalBodyCreate ref={createFormRef} />,
      "Update Student": (
        <ModalBodyUpdate ref={updateFormRef} data={editedUser} />
      ),
      "Delete Student": (
        <ModalBodyDelete ref={deleteFormRef} data={editedUser} />
      ),
    }[modalDescription]!;
  };

  const queryClient = useQueryClient();

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
            return {
              "Create Student": async () => {
                try {
                  const createFormData = createFormRef.current?.getFormData();
                  const parsed = studentSchema.safeParse(createFormData);

                  if (!parsed.success) {
                    const errorMessages = parsed.error.errors
                      .map((e) => e.message)
                      .join("\n");

                    ErrorToast({
                      title: errorMessages,
                      description: "Validation error",
                    });

                    return;
                  }

                  await createStudent(parsed.data);
                  await queryClient.invalidateQueries({
                    queryKey: ["students"],
                  });

                  SuccessToast({
                    title: "Student created successfully!",
                    description: "Ok",
                  });
                } catch (error) {
                  console.error("Create Student Error:", error);
                  ErrorToast({
                    title: "Something went wrong while creating the student.",
                    description: "Error",
                  });
                }
              },
              "Update Student": async () => {
                try {
                  const updateFormData = updateFormRef.current?.getFormData();
                  const parsed = studentSchema.safeParse(updateFormData);

                  if (!parsed.success) {
                    const errorMessages = parsed.error.errors
                      .map((e) => e.message)
                      .join("\n");

                    ErrorToast({
                      title: errorMessages,
                      description: "Validation error",
                    });

                    return;
                  }

                  await updateStudent(parsed.data);
                  queryClient.invalidateQueries({ queryKey: ["students"] });

                  SuccessToast({
                    title: "Student updated successfully!",
                    description: "Ok",
                  });
                } catch (error) {
                  console.error("Update Student Error:", error);
                  ErrorToast({
                    title: "Something went wrong while updating the student.",
                    description: "Error",
                  });
                }
              },
              "Delete Student": async () => {
                try {
                  const deleteFormData = deleteFormRef.current?.getFormData();
                  const parsed = studentDeleteSchema.safeParse(deleteFormData);

                  if (!parsed.success) {
                    const errorMessages = parsed.error.errors
                      .map((e) => e.message)
                      .join("\n");

                    ErrorToast({
                      title: errorMessages,
                      description: "Validation error",
                    });

                    return;
                  }

                  await deleteStudent(parsed.data);
                  queryClient.invalidateQueries({ queryKey: ["students"] });

                  SuccessToast({
                    title: "Student deleted successfully!",
                    description: "Ok",
                  });
                } catch (error) {
                  console.error("Delete Student Error:", error);
                  ErrorToast({
                    title: "Something went wrong while deleting the student.",
                    description: "Error",
                  });
                }
              },
            }[whichModal]!();
          }}
        />
      </section>
    </div>
  );
}
