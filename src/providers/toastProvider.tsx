"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { ReactNode } from "react";

export default function ToastProviders({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-right" toastOffset={35} />
      {children}
    </HeroUIProvider>
  );
}
