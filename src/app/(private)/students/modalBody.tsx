import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Chip, ChipProps, Input, Select, SelectItem } from "@heroui/react";
import { IdCard, User as UserIcon } from "lucide-react";

import { MailIcon } from "@/src/config/icons";

export type CreateFormRef = {
  getFormData: () => {
    name: string;
    email: string;
    cpf: string;
  };
};

export const ModalBodyCreate = forwardRef<CreateFormRef>((_, ref) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const cpfInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      name: nameInputRef.current?.value || "",
      email: emailInputRef.current?.value || "",
      cpf: cpfInputRef.current?.value || "",
    }),
  }));

  return (
    <div className="space-y-4">
      <Input
        ref={nameInputRef}
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
        ref={emailInputRef}
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
        ref={cpfInputRef}
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
});

ModalBodyCreate.displayName = "ModalBodyCreate";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const status = [
  { key: 1, status: "active", color: "success" },
  { key: 2, status: "paused", color: "danger" },
  { key: 3, status: "vacation", color: "warning" },
];

export type ModalBodyUpdateHandle = {
  getFormData: () => {
    name: string;
    email: string;
    role: string;
    status: string;
  };
};

export const ModalBodyUpdate = forwardRef<ModalBodyUpdateHandle, { data: any }>(
  ({ data }, ref) => {
    const [name, setName] = useState<string>(data.name || "");
    const [email, setEmail] = useState<string>(data.email || "");
    const [role, setRole] = useState<string>(data.role || "");
    const [statusValue, setStatusValue] = useState<string>(data.status || "");

    useImperativeHandle(ref, () => ({
      getFormData: () => ({
        name,
        email,
        role,
        status: statusValue,
      }),
    }));

    return (
      <div className="space-y-4">
        <Input
          classNames={{
            input:
              "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
          }}
          defaultValue={name}
          endContent={
            <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Name"
          placeholder="Enter your name"
          variant="bordered"
          onValueChange={setName}
        />
        <Input
          classNames={{
            input:
              "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
          }}
          defaultValue={email}
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
          onValueChange={setEmail}
        />
        <Input
          classNames={{
            input:
              "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
          }}
          defaultValue={role}
          endContent={
            <IdCard className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Role"
          placeholder="Enter your role"
          variant="bordered"
          onValueChange={setRole}
        />
        <Select
          classNames={{
            label: "group-data-[filled=true]:-translate-y-3.5",
            trigger: "max-w-[10rem]",
            listboxWrapper: "max-h-[400px]",
          }}
          defaultSelectedKeys={[statusValue]}
          items={status}
          label="Status"
          placeholder="Select an status"
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <Chip
                  className="capitalize"
                  color={statusColorMap[item.data!.status]}
                  size="sm"
                  variant="flat"
                >
                  {item.data!.status}
                </Chip>
              </div>
            ));
          }}
          variant="bordered"
          onSelectionChange={(e) => {
            if (e instanceof Set) {
              setStatusValue(String(Array.from(e)[0]));
            }
          }}
        >
          {(status) => (
            <SelectItem key={status.status} textValue={status.status}>
              <div className="flex gap-2 items-center">
                <Chip
                  className="capitalize"
                  color={statusColorMap[status.status]}
                  size="sm"
                  variant="flat"
                >
                  {status.status}
                </Chip>
              </div>
            </SelectItem>
          )}
        </Select>
      </div>
    );
  },
);

ModalBodyUpdate.displayName = "ModalBodyUpdate";

export const modalBodyDelete = (data: any) => {
  return (
    <div className="space-y-4">
      <p>
        Are you sure you want to delete? <b>{data.name}</b>
      </p>
    </div>
  );
};
