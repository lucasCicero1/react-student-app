import { addToast } from "@heroui/react";

interface IToastProps {
  title: string;
  description: string;
}

export function SuccessToast({ title, description }: IToastProps) {
  addToast({ title, description, color: "success" });
}

export function ErrorToast({ title, description }: IToastProps) {
  addToast({ title, description, color: "danger" });
}
