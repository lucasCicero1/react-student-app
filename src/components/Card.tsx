"use client";

import {
  Card as CardUI,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@heroui/react";

interface ICardProps {
  header?: React.ReactNode | string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ header, children, footer }: Readonly<ICardProps>) {
  return (
    <CardUI className="max-w-[400px]">
      <CardHeader className="flex gap-3 justify-center">{header}</CardHeader>
      <Divider />
      <CardBody>{children}</CardBody>
      <Divider />
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </CardUI>
  );
}
