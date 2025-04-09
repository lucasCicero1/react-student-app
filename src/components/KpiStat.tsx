"use client";

import React from "react";
import { Button, Card, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react";

interface KpiStatProps {
  change: string;
  changeType: string;
  iconName: string;
  title: string;
  trendChipPosition: string;
  value: string;
}

export default function KpiStat({
  changeType,
  iconName,
  title,
  value,
  trendChipPosition,
  change,
}: Readonly<KpiStatProps>) {
  return (
    <dl>
      <Card className="border border-transparent dark:border-default-100">
        <div className="flex p-4">
          <div
            className={cn(
              "mt-1 flex h-8 w-8 items-center justify-center rounded-md",
              {
                "bg-success-50": changeType === "positive",
                "bg-warning-50": changeType === "neutral",
                "bg-danger-50": changeType === "negative",
              },
            )}
          >
            {changeType === "positive" ? (
              <Icon className="text-success" icon={iconName} width={20} />
            ) : changeType === "neutral" ? (
              <Icon className="text-warning" icon={iconName} width={20} />
            ) : (
              <Icon className="text-danger" icon={iconName} width={20} />
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <dt className="mx-4 text-small font-medium text-default-500">
              {title}
            </dt>
            <dd className="px-4 text-2xl font-semibold text-default-700">
              {value}
            </dd>
          </div>

          <Chip
            className={cn("absolute right-4", {
              "top-4": trendChipPosition === "top",
              "bottom-4": trendChipPosition === "bottom",
            })}
            classNames={{
              content: "font-semibold text-[0.65rem]",
            }}
            color={
              changeType === "positive"
                ? "success"
                : changeType === "neutral"
                  ? "warning"
                  : "danger"
            }
            radius="sm"
            size="sm"
            startContent={
              changeType === "positive" ? (
                <Icon
                  height={12}
                  icon={"solar:arrow-right-up-linear"}
                  width={12}
                />
              ) : changeType === "neutral" ? (
                <Icon
                  height={12}
                  icon={"solar:arrow-right-linear"}
                  width={12}
                />
              ) : (
                <Icon
                  height={12}
                  icon={"solar:arrow-right-down-linear"}
                  width={12}
                />
              )
            }
            variant="flat"
          >
            {change}
          </Chip>
        </div>

        <div className="bg-default-100">
          <Button
            fullWidth
            className="flex justify-start text-xs text-default-500 data-[pressed]:scale-100"
            radius="none"
            variant="light"
          >
            View All
          </Button>
        </div>
      </Card>
    </dl>
  );
}
