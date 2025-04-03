import { Chip, ChipProps, Input, Select, SelectItem } from "@heroui/react";
import { IdCard, User as UserIcon } from "lucide-react";

import { MailIcon } from "@/src/config/icons";

export const modalBody = (
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

export const modalBodyUpdate = (data: any) => {
  return (
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
        value={data.name}
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
        value={data.email}
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
        label="Role"
        placeholder="Enter your role"
        value={data.role}
        variant="bordered"
      />
      <Select
        classNames={{
          label: "group-data-[filled=true]:-translate-y-3.5",
          trigger: "max-w-[10rem]",
          listboxWrapper: "max-h-[400px]",
        }}
        defaultSelectedKeys={[data.status]}
        items={status}
        label="Status"
        placeholder="Select a user"
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
};
