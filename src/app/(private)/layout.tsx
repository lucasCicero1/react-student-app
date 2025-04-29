import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Menu as IconMenu } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Providers } from "../providers";

import { nextAuthOptions } from "@/src/lib/auth/options";
import { Menu } from "@/src/components/Menu";
import { Navbar } from "@/src/components/Navbar";
import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import { ReactQueryProvider } from "@/src/providers/ReactQueryProvider";

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

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div
      className={clsx(
        "min-h-screen bg-background font-sans antialiased dark:bg-slate-700 w-full",
        fontSans.variable,
      )}
    >
      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <ReactQueryProvider>
          <div className="h-screen flex">
            {/* LEFT */}
            {/* w-[14%] */}
            <div className="w-[0%] sm:w-[8%] md:w-[10%] lg:w-[16%] xl:w-[14%]">
              <div className="h-[60px] sm:px-2 sm:text-xs md:px-4 md:text-sm flex items-center justify-between px-8 bg-slate-700 dark:bg-slate-950">
                <Link href="/">
                  <span className="hidden sm:block lg:block text-gray-300 font-medium">
                    Achoo
                  </span>
                </Link>
                <IconMenu
                  className="sm:hidden lg:block text-slate-500 cursor-pointer"
                  height={25}
                  width={25}
                />
              </div>
              <Menu />
            </div>

            {/* RIGHT */}
            {/* w-[86%] */}
            <div className="w-[100%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-slate-100 dark:bg-slate-800 dark:border-l-1 border-transparent dark:border-default-300 overflow-y-scroll">
              <Navbar user={session?.user?.name} />
              <div className="flex-1 mx-6 sm:mx-12 md:mx-16 lg:mx-20 xl:mx-24">
                {children}
              </div>
            </div>
          </div>
        </ReactQueryProvider>
      </Providers>
    </div>
  );
}
