import { Input } from "@heroui/react";
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
