"use client";

import {
  Navbar as NavbarUI,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import React from "react";
import { Link as LinkR } from "@heroui/react";

import { ThemeSwitch } from "./theme-switch";

interface INavbarProps {
  user: string | null | undefined;
}

export function Navbar({ user }: INavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const router = useRouter();

  return (
    <NavbarUI
      className="h-[60px] bg-slate-500 dark:bg-slate-900"
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarContent
        className="hidden sm:flex gap-4 text-white"
        justify="center"
      >
        <NavbarItem className="hidden sm:block">
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive className="hidden sm:block">
          <Link aria-current="page" color="secondary" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:block">
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="w-[66%]">
        <NavbarMenuItem>
          <LinkR
            color="foreground"
            href="/"
            onPress={() => setIsMenuOpen(false)}
          >
            Home
          </LinkR>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <LinkR
            color="foreground"
            href="/students"
            onPress={() => setIsMenuOpen(false)}
          >
            Students
          </LinkR>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <LinkR
            color="foreground"
            href="#"
            onPress={() => setIsMenuOpen(false)}
          >
            Profile
          </LinkR>
        </NavbarMenuItem>
      </NavbarMenu>

      <NavbarContent as="div" justify="end">
        <div className="px-3">
          <ThemeSwitch />
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{user}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="configurations" showDivider={true}>
              Configurations
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={async () => {
                await signOut({ redirect: false });
                router.replace("/login");
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NavbarUI>
  );
}
