import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Chip, ChipProps, Input, Select, SelectItem } from "@heroui/react";
import { CircleUser, IdCard, User as UserIcon } from "lucide-react";

import { MailIcon } from "@/src/config/icons";

export type CreateFormRef = {
  getFormData: () => {
    name: string;
    email: string;
    cpf: string;
  };
};

export const ModalBodyCreate = forwardRef<CreateFormRef>((_, ref) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const cpfInputRef = useRef<HTMLInputElement>(null);
  const statusValueRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      avatar: avatarInputRef.current?.value || "",
      name: nameInputRef.current?.value || "",
      email: emailInputRef.current?.value || "",
      cpf: cpfInputRef.current?.value || "",
      status: statusValueRef.current?.value || "",
    }),
  }));

  return (
    <div className="space-y-4">
      <Input
        ref={avatarInputRef}
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        endContent={
          <CircleUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Avatar"
        placeholder="Enter your avatar url"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">https://</span>
          </div>
        }
        type="url"
        variant="bordered"
      />
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
      <Select
        ref={statusValueRef}
        classNames={{
          label: "group-data-[filled=true]:-translate-y-3.5",
          trigger: "max-w-[10rem]",
          listboxWrapper: "max-h-[400px]",
        }}
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
    cpf: string;
    status: string;
    avatar: string;
  };
};

export const ModalBodyUpdate = forwardRef<ModalBodyUpdateHandle, { data: any }>(
  ({ data }, ref) => {
    const [name, setName] = useState<string>(data.name || "");
    const [email, setEmail] = useState<string>(data.email || "");
    const [cpf, setCpf] = useState<string>(data.cpf || "");
    const [statusValue, setStatusValue] = useState<string>(data.status || "");
    const [avatar, setAvatar] = useState<string>(data.avatar || "");

    useImperativeHandle(ref, () => ({
      getFormData: () => ({
        name,
        email,
        cpf,
        status: statusValue,
        avatar,
      }),
    }));

    return (
      <div className="space-y-4">
        <Input
          classNames={{
            input:
              "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
          }}
          defaultValue={avatar}
          endContent={
            <CircleUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Avatar"
          placeholder="Enter your avatar url"
          type="url"
          variant="bordered"
          onValueChange={setAvatar}
        />
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
          defaultValue={cpf}
          endContent={
            <IdCard className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Cpf"
          placeholder="Enter your cpf"
          variant="bordered"
          onValueChange={setCpf}
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

export interface DeleteFormRef {
  getFormData: () => {
    id: string;
    name: string;
    email: string;
  };
}

export const ModalBodyDelete = forwardRef<DeleteFormRef, { data: any }>(
  ({ data }, ref) => {
    useImperativeHandle(ref, () => ({
      getFormData: () => ({
        id: data.id,
        name: data.name,
        email: data.email,
      }),
    }));

    return (
      <div className="space-y-4">
        <p>
          Are you sure you want to delete <b>{data.name}</b>?
        </p>
      </div>
    );
  },
);

ModalBodyDelete.displayName = "ModalBodyDelete";
