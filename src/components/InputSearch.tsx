import { Input } from "@heroui/input";

import { SearchIcon } from "@/src/config/icons";

interface IInputSearchProps {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value?: string) => void;
}

export function InputSearch({
  filterValue,
  onClear,
  onSearchChange,
}: Readonly<IInputSearchProps>) {
  return (
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
  );
}
