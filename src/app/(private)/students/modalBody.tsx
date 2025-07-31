import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Chip, ChipProps, Input, Select, SelectItem } from "@heroui/react";
import { CircleUser, IdCard, User as UserIcon } from "lucide-react";

import { MailIcon } from "@/src/config/icons";
import { User as IUser } from "@/src/types";

export type CreateFormRef = {
  getFormData: () => {
    avatar: string;
    name: string;
    email: string;
    cpf: string;
    status: string;
  };
};

export const ModalBodyCreate = forwardRef<
  CreateFormRef,
  { onChange?: () => void }
>(({ onChange }, ref) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const cpfInputRef = useRef<HTMLInputElement>(null);
  const statusValueRef = useRef<HTMLSelectElement>(null);
  const statusValue = useRef<string>("");

  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      avatar: avatarInputRef.current?.value || "",
      name: nameInputRef.current?.value || "",
      email: emailInputRef.current?.value || "",
      cpf: cpfInputRef.current?.value || "",
      status: statusValue.current || "",
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
          <CircleUser className="text-2xl text-default-400 pointer-events-none shrink-0" />
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
        isRequired
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        endContent={
          <UserIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
        }
        label="Name"
        placeholder="Enter your name"
        validate={(value: string) => {
          if (value.length < 3) return "Name must be 3 characters long";
        }}
        variant="bordered"
        onInput={onChange}
      />
      <Input
        ref={emailInputRef}
        isRequired
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
        }
        label="Email"
        placeholder="Enter your email"
        type="email"
        variant="bordered"
        onInput={onChange}
      />
      <Input
        ref={cpfInputRef}
        isRequired
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        endContent={
          <IdCard className="text-2xl text-default-400 pointer-events-none shrink-0" />
        }
        label="CPF"
        maxLength={11}
        placeholder="Enter your cpf"
        validate={(value: string) => {
          if (value.length < 11) return "CPF must be 11 characters long";
        }}
        variant="bordered"
        onInput={onChange}
      />
      <Select
        ref={statusValueRef}
        isRequired
        classNames={{
          label: "group-data-[filled=true]:-translate-y-3.5",
          trigger: "max-w-40",
          listboxWrapper: "max-h-[400px]",
        }}
        errorMessage="Invalid status"
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
        onChange={(e) => {
          statusValue.current = e.target.value;
          onChange?.();
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
    avatar?: string;
  };
};

interface ModalBodyUpdateProps {
  onChange?: () => void;
  data: Partial<IUser>;
}

export const ModalBodyUpdate = forwardRef<
  ModalBodyUpdateHandle,
  ModalBodyUpdateProps
>(({ onChange, data }, ref) => {
  const [name, setName] = useState<string>(data.name ?? "");
  const [email, setEmail] = useState<string>(data.email ?? "");
  const [cpf, setCpf] = useState<string>(data.cpf ?? "");
  const [statusValue, setStatusValue] = useState<string>(data.status ?? "");
  const [avatar, setAvatar] = useState<string>(data.avatar ?? "");

  React.useEffect(() => {
    onChange?.();
  }, [name, email, cpf, statusValue]);

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
          <CircleUser className="text-2xl text-default-400 pointer-events-none shrink-0" />
        }
        label="Avatar"
        placeholder="Enter your avatar url"
        type="url"
        variant="bordered"
        onValueChange={setAvatar}
      />
      <Input
        isRequired
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        defaultValue={name}
        endContent={
          <UserIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
        }
        label="Name"
        placeholder="Enter your name"
        variant="bordered"
        onValueChange={setName}
      />
      <Input
        isRequired
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        defaultValue={email}
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
        }
        label="Email"
        placeholder="Enter your email"
        type="email"
        validate={(value: string) => {
          if (!value.length) return "Email is required !";
        }}
        variant="bordered"
        onValueChange={setEmail}
      />
      <Input
        isDisabled
        isRequired
        classNames={{
          input:
            "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
        }}
        defaultValue={cpf}
        endContent={
          <IdCard className="text-2xl text-default-400 pointer-events-none shrink-0" />
        }
        label="Cpf"
        placeholder="Enter your cpf"
        variant="bordered"
        onValueChange={setCpf}
      />
      <Select
        isRequired
        classNames={{
          label: "group-data-[filled=true]:-translate-y-3.5",
          trigger: "max-w-40",
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
        onChange={(e) => {
          setStatusValue(e.target.value);
          onChange?.();
        }}
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
});

ModalBodyUpdate.displayName = "ModalBodyUpdate";

export interface DeleteFormRef {
  getFormData: () => {
    id: string;
    name: string;
    email: string;
    cpf: string;
  };
}

export const ModalBodyDelete = forwardRef<DeleteFormRef, { data: any }>(
  ({ data }, ref) => {
    useImperativeHandle(ref, () => ({
      getFormData: () => ({
        id: data.id,
        name: data.name,
        email: data.email,
        cpf: data.cpf,
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
