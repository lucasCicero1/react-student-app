import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { nextAuthOptions } from "@/src/lib/auth/options";
import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import { ThemeSwitch } from "@/src/components/theme-switch";
import ToastProviders from "@/src/providers/toastProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div
      className={clsx(
        "min-h-screen bg-background font-sans antialiased dark:bg-gray-950 w-full",
        fontSans.variable,
      )}
    >
      <div className="h-screen flex flex-col">
        <div className="p-5 px-10 flex justify-end">
          <ThemeSwitch />
        </div>
        <div className=" bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <ToastProviders>{children}</ToastProviders>
        </div>
      </div>
    </div>
  );
}
