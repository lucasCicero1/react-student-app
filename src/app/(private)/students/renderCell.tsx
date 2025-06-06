import React from "react";
import { User, Chip, Tooltip, ChipProps, Button } from "@heroui/react";

import { DeleteIcon, EditIcon } from "@/src/config/icons";
import { User as IUser } from "@/src/types";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "CPF", uid: "cpf" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const renderCell = (
  user: IUser,
  columnKey: React.Key,
  handleEdit: (data: any) => void,
  handleDelete: (data: any) => void,
) => {
  const cellValue = user[columnKey as keyof IUser];

  switch (columnKey) {
    case "name":
      return (
        <User avatarProps={{ radius: "lg", src: user.avatar }} name={cellValue}>
          {user.name}
        </User>
      );
    case "email":
      return <p className="text-bold text-sm">{cellValue}</p>;
    case "cpf":
      return <p className="text-bold text-sm">{cellValue}</p>;
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
              <Button
                isIconOnly
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                variant="light"
                onPress={() => handleEdit(user)}
              >
                <EditIcon />
              </Button>
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Button
                isIconOnly
                className="text-lg text-danger cursor-pointer active:opacity-50"
                variant="light"
                onPress={() => handleDelete(user)}
              >
                <DeleteIcon />
              </Button>
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
