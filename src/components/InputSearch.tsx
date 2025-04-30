import { Input } from "@heroui/input";

import { SearchIcon } from "@/src/config/icons";

interface IInputSearchProps {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value?: string) => void;
  placeholder: string;
}

export function InputSearch({
  filterValue,
  onClear,
  onSearchChange,
  placeholder = "Search...",
}: Readonly<IInputSearchProps>) {
  return (
    <Input
      isClearable
      className="w-full md:max-w-[44%]"
      classNames={{
        input:
          "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
      }}
      placeholder={placeholder}
      startContent={<SearchIcon />}
      value={filterValue}
      onClear={onClear}
      onValueChange={onSearchChange}
    />
  );
}
