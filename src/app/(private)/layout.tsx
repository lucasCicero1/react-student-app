import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Providers } from "../providers";

import { nextAuthOptions } from "@/src/app/api/auth/[...nextauth]/route";
import MenuComponent from "@/src/components/Menu";
import { NavbarComponent } from "@/src/components/Navbar";
import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";

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
        "min-h-screen bg-background font-sans antialiased dark:bg-gray-950 w-full",
        fontSans.variable,
      )}
    >
      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <div className="h-screen flex">
          {/* LEFT */}
          <div className="w-[14%] md:w-[10%] lg:w-[16%] xl:w-[14%]">
            <div className="h-[60px] flex items-center justify-between px-8 bg-slate-700">
              <Link href="/">
                <span className="hidden lg:block text-gray-300 font-medium">
                  Achoo
                </span>
              </Link>
              <Menu
                className="text-slate-500 cursor-pointer"
                height={25}
                width={25}
              />
            </div>
            <MenuComponent />
          </div>

          {/* RIGHT */}
          <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-slate-100 overflow-scroll">
            <NavbarComponent />
            <div className="flex-1 mx-20">{children}</div>
          </div>
        </div>
      </Providers>
    </div>
  );
}
